import { useEffect, useState } from "react";
import  "./Popup.css"
import {ColorResult, RGBColor, SketchPicker} from "react-color";
export default function Popup(){
    const [color,setColor] = useState<RGBColor>()
    const [hexCopied,setHexCopied] = useState(false)
    const [rgbaCopied,setRgbaCopied] = useState(false)
    useEffect(()=>{
        let element= document.getElementById("picker")?.getElementsByTagName('div')[0]
        element?.setAttribute("style","width: 200px; padding: 10px 10px 0px; box-sizing: initial; background: rgb(255, 255, 255); border-radius: 4px; box-shadow: none;")
        
    })
    // const hexToRgba = (hex:string)=>{
    //     // 假设输入是6字符的HEX代码
    //     if (hex === '#') {
    //         hex = hex.slice(1); // 去除#号
    //     }
    //     if (hex.length === 3) {
    //         hex = hex.split('').map(item => item + item).join(''); // 3字符HEX转换为6字符
    //     }
    //     let r = parseInt(hex.slice(0, 2), 16); // 红色分量
    //     let g = parseInt(hex.slice(2, 4), 16); // 绿色分量
    //     let b = parseInt(hex.slice(4, 6), 16); // 蓝色分量
    //     let a = 1; // Alpha通常默认为1（完全不透明），但可以根据需要调整
    //     return `rgba(${r}, ${g}, ${b}, ${a})`; // 返回RGBA格式的颜色值
    // }
    const rgbaToHex = (color:RGBColor|undefined)=>{
        if(!color) return "#000000";
        const {r,g,b} = color;
        let hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`; // RGB部分转换为HEX，忽略Alpha通道，因为HEX格式通常不包含Alpha信息
        return hex; // 返回HEX颜色代码，不包含Alpha信息
    }
    const rgbaToRgbaString = (color:RGBColor|undefined)=>{
        if(!color) return `rgba(${0}, ${0}, ${0}, ${100})`;
        const {r,g,b,a} = color
        return `rgba(${r}, ${g}, ${b}, ${a})`
    }
    const copyToClipboard = async (text:string,type:string) => {
        try {
          await navigator.clipboard.writeText(text);
          if(type==='RGBA'){
            setRgbaCopied(true)
            setHexCopied(false)
            setTimeout(()=>{
                setRgbaCopied(false)
            },2000)
          }else{
            setHexCopied(true)
            setRgbaCopied(false)
            setTimeout(()=>{
                setHexCopied(false)
            },2000)
          }
        } catch (err) {
          console.error('无法复制到剪贴板:', err);
        }
    };
    const copy= async (text:string) => {
        await navigator.clipboard.writeText(text);
    }
    const colorGroupSummer = [
        "#FFA500", // 橙色
        "#BFFF00", // 青柠绿
        "#87CEFA", // 天蓝
        "#FF69B4", // 荧光粉
        "#FFFF00", // 明黄
        "#00BFFF"  // 海洋蓝
    ];

const colorGroupTropicalFruits = [
    "#FFD700", // 芒果橙
    "#FF0000", // 草莓红
    "#98FB98", // 薄荷绿
    "#FFD700", // 柠檬黄
    "#6699CC", // 蓝莓蓝
    "#FFC0CB"  // 桃子粉
];
const colorGroupNature = [
    "#FFD700", // 阳光黄
    "#228B22", // 森林绿
    "#ADD8E6", // 湖水蓝
    "#FFC0CB", // 晨曦粉
    "#FF4500", // 橙红
    "#87CEEB"  // 天空蓝
];
    const defaultColor = ()=>{
        return <>
        <div className="grid-container">
            <div className="grid-row">{colorGroupSummer.map((item)=>{return <div className="grid-cell" style={{backgroundColor:item}} onClick={()=>copy(item)}>{''}</div>})}</div>
            <div className="grid-row">{colorGroupTropicalFruits.map((item)=>{return <div className="grid-cell" style={{backgroundColor:item}} onClick={()=>copy(item)}>{''}</div>})}</div>
            <div className="grid-row">{colorGroupNature.map((item)=>{return <div className="grid-cell" style={{backgroundColor:item}} onClick={()=>copy(item)}>{''}</div>})}</div>
        </div>
        </>
    }
    return <>
    <div className="Popup">
    <div className="content">
        <div className="sub-content" style={{color:rgbaToRgbaString(color)}} onClick={()=>{copyToClipboard(rgbaToRgbaString(color),'RGBA')}}>
            {rgbaToRgbaString(color)}
        {!rgbaCopied && <img src="copy.svg" width="16" height="16"/>}
        {rgbaCopied &&<img src="yes.svg" width="16" height="16"/>}
        </div>
        <div className="sub-content" style={{color:rgbaToHex(color)}} onClick={()=>{copyToClipboard(rgbaToHex(color),'HEX')}}>
            {rgbaToHex(color) }
        {!hexCopied && <img src="copy.svg" width="16" height="16"/>}
        {hexCopied &&<img src="yes.svg" width="16" height="16"/>}
        </div>
        {defaultColor()}
        {/* <div className="button">
            拾取页面颜色
        </div> */}
    </div>
    <div id="picker">
        <SketchPicker 
        className="sketch-picker"
        presetColors={[]}
        color={color}
        onChange={(color:ColorResult)=>{setColor(color.rgb)}}
        />
    </div>
    </div>
    </>
    
}