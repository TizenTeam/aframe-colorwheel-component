!function(e){function t(o){if(i[o])return i[o].exports;var r=i[o]={exports:{},id:o,loaded:!1};return e[o].call(r.exports,r,r.exports,t),r.loaded=!0,r.exports}var i={};return t.m=e,t.c=i,t.p="",t(0)}([function(e,t,i){!function(){throw new Error('Cannot find module "/Users/mkargas/projects/aframe-colorwheel-component/index.js"')}(),e.exports=i(2)},,function(e,t){"use strict";!function(e){function t(o){if(i[o])return i[o].exports;var r=i[o]={exports:{},id:o,loaded:!1};return e[o].call(r.exports,r,r.exports,t),r.loaded=!0,r.exports}var i={};return t.m=e,t.c=i,t.p="",t(0)}([function(e,t,i){var o=i(1);AFRAME.registerComponent("colorwheel",{dependencies:["raycaster"],tweenDuration:280,tweenEasing:TWEEN.Easing.Cubic.Out,padding:.15,hsv:{h:0,s:0,v:1},color:"#ffffff",schema:{value:{type:"string",default:""},name:{type:"string",default:""},disabled:{type:"boolean",default:!1},color:{type:"color",default:"#000"},backgroundColor:{type:"color",default:"#FFF"},wheelSize:{type:"number",default:.4},showSelection:{type:"boolean",default:!0},selectionSize:{type:"number",default:.1}},setPositionTween:function(e,t,i){this.tween=new TWEEN.Tween(t).to(i,this.tweenDuration).onUpdate(function(){e.position.x=this.x,e.position.y=this.y,e.position.z=this.z}).easing(this.tweenEasing).start()},setColorTween:function(e,t,i){this.tween=new TWEEN.Tween(new THREE.Color(t)).to(i,this.tweenDuration).onUpdate(function(){e.color.r=this.r,e.color.g=this.g,e.color.b=this.b}).easing(this.tweenEasing).start()},init:function(){var e=this,t=this.padding,i={color:"#ffffff",flatShading:!0,transparent:!0,fog:!1,side:"double"};this.backgroundWidth=this.backgroundHeight=2*this.data.wheelSize,AFRAME.components.hasOwnProperty("rounded")?(this.background=document.createElement("a-rounded"),this.background.setAttribute("radius",.02)):this.background=document.createElement("a-entity"),console.debug(this.background),this.background.setAttribute("width",this.backgroundWidth+2*t),this.background.setAttribute("height",this.backgroundHeight+2*t),this.background.setAttribute("position",{x:-(this.data.wheelSize+t),y:-(this.data.wheelSize+t),z:-.001}),this.background.setAttribute("side","double"),this.el.appendChild(this.background),this.colorWheel=document.createElement("a-circle"),this.colorWheel.setAttribute("radius",this.data.wheelSize),this.colorWheel.setAttribute("material",i),this.colorWheel.setAttribute("position",{x:0,y:0,z:0}),this.el.appendChild(this.colorWheel),this.brightnessSliderHeight=2*(this.data.wheelSize+t),this.brightnessSliderWidth=.1,this.brightnessSlider=document.createElement("a-plane"),this.brightnessSlider.setAttribute("width",this.brightnessSliderWidth),this.brightnessSlider.setAttribute("height",this.brightnessSliderHeight),this.brightnessSlider.setAttribute("material",i),this.brightnessSlider.setAttribute("position",{x:this.data.wheelSize+this.brightnessSliderWidth,y:0,z:0}),this.el.appendChild(this.brightnessSlider),this.data.showSelection&&(this.selectionEl=document.createElement("a-circle"),this.selectionEl.setAttribute("radius",this.data.selectionSize),this.selectionEl.setAttribute("material",i),this.selectionEl.setAttribute("position",{x:-this.data.wheelSize,y:this.data.wheelSize,z:.001}),this.el.appendChild(this.selectionEl)),this.colorCursorOptions={cursorRadius:.025,cursorSegments:32,cursorColor:new THREE.Color(0)},this.colorCursorOptions.cursorMaterial=new THREE.MeshBasicMaterial({color:this.colorCursorOptions.cursorColor,transparent:!0}),this.colorCursor=document.createElement("a-entity"),this.brightnessCursor=document.createElement("a-entity");var o=new THREE.TorusBufferGeometry(this.colorCursorOptions.cursorRadius,this.colorCursorOptions.cursorRadius-.02,this.colorCursorOptions.cursorSegments,this.colorCursorOptions.cursorSegments/4);this.colorCursor.setObject3D("mesh",new THREE.Mesh(o,this.colorCursorOptions.cursorMaterial)),this.brightnessCursor.setObject3D("mesh",new THREE.Mesh(o,this.colorCursorOptions.cursorMaterial)),this.el.appendChild(this.colorCursor),this.brightnessSlider.appendChild(this.brightnessCursor),this.brightnessCursor.setAttribute("position",{x:0,y:this.brightnessSliderHeight/2,z:0}),this.bindMethods(),setTimeout(function(){e.el.initColorWheel(),e.el.initBrightnessSlider(),e.el.refreshRaycaster(),e.colorWheel.addEventListener("click",function(t){e.data.disabled||e.el.onHueDown(t.detail.intersection.point)}),e.brightnessSlider.addEventListener("click",function(t){e.data.disabled||e.el.onBrightnessDown(t.detail.intersection.point)})},5)},bindMethods:function(){this.el.initColorWheel=this.initColorWheel.bind(this),this.el.initBrightnessSlider=this.initBrightnessSlider.bind(this),this.el.updateColor=this.updateColor.bind(this),this.el.onHueDown=this.onHueDown.bind(this),this.el.onBrightnessDown=this.onBrightnessDown.bind(this),this.el.refreshRaycaster=this.refreshRaycaster.bind(this)},refreshRaycaster:function(){var e=AFRAME.scenes[0].querySelector("[raycaster]");e.components.raycaster.refreshObjects()},initBrightnessSlider:function(){var e="\n      varying vec2 vUv;\n      void main(){\n        vUv = uv;\n        gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);\n      }\n    ",t="\n      uniform vec3 color1;\n      uniform vec3 color2;\n      varying vec2 vUv;\n\n      void main(){\n        vec4 c1 = vec4(color1, 1.0);\n  \t    vec4 c2 = vec4(color2, 1.0);\n\n        vec4 color = mix(c2, c1, smoothstep(0.0, 1.0, vUv.y));\n        gl_FragColor = color;\n      }\n    ",i=new THREE.ShaderMaterial({uniforms:{color1:{type:"c",value:new THREE.Color(16777215)},color2:{type:"c",value:new THREE.Color(0)}},vertexShader:e,fragmentShader:t});this.brightnessSlider.getObject3D("mesh").material=i,this.brightnessSlider.getObject3D("mesh").material.needsUpdate=!0},initColorWheel:function(){var e=this.colorWheel.getObject3D("mesh"),t="\n\n      varying vec2 vUv;\n      void main() {\n        vUv = uv;\n        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);\n        gl_Position = projectionMatrix * mvPosition;\n      }\n    ",i="\n      #define M_PI2 6.28318530718\n      uniform float brightness;\n      varying vec2 vUv;\n      vec3 hsb2rgb(in vec3 c){\n          vec3 rgb = clamp(abs(mod(c.x * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0 );\n          rgb = rgb * rgb * (3.0 - 2.0 * rgb);\n          return c.z * mix( vec3(1.0), rgb, c.y);\n      }\n\n      void main() {\n        vec2 toCenter = vec2(0.5) - vUv;\n        float angle = atan(toCenter.y, toCenter.x);\n        float radius = length(toCenter) * 2.0;\n        vec3 color = hsb2rgb(vec3((angle / M_PI2) + 0.5, radius, brightness));\n        gl_FragColor = vec4(color, 1.0);\n      }\n      ",o=new THREE.ShaderMaterial({uniforms:{brightness:{type:"f",value:this.hsv.v}},vertexShader:t,fragmentShader:i});e.material=o,e.material.needsUpdate=!0},onBrightnessDown:function(e){var t=this.brightnessSlider.getObject3D("mesh"),i=this.brightnessCursor.getObject3D("mesh"),o=this.colorWheel.getObject3D("mesh");t.updateMatrixWorld(),t.worldToLocal(e);var r=e.y+this.brightnessSliderHeight/2,s=r/this.brightnessSliderHeight,n={x:0,y:e.y-this.brightnessSliderHeight/2,z:0};this.setPositionTween(i,i.position,n),o.material.uniforms.brightness.value=s,this.hsv.v=s,this.el.updateColor()},onHueDown:function(e){var t=this.colorWheel.getObject3D("mesh"),i=this.colorCursor.getObject3D("mesh"),o=this.data.wheelSize;t.updateMatrixWorld(),t.worldToLocal(e),this.setPositionTween(i,i.position,e);var r={r:Math.sqrt(e.x*e.x+e.y*e.y),theta:Math.PI+Math.atan2(e.y,e.x)},s=(r.theta*(180/Math.PI)+180)%360;this.hsv.h=s/360,this.hsv.s=r.r/o,this.el.updateColor()},updateColor:function(){var e=this.hsvToRgb(this.hsv),t="rgb("+e.r+", "+e.g+", "+e.b+")",i=this.selectionEl.getObject3D("mesh"),r=this.colorCursor.getObject3D("mesh"),s=this.brightnessCursor.getObject3D("mesh");this.data.showSelection&&(this.setColorTween(i.material,i.material.color,new THREE.Color(t)),i.material.needsUpdate=!0),this.hsv.v>=.5?(this.setColorTween(r.material,r.material.color,new THREE.Color(0)),this.setColorTween(s.material,s.material.color,new THREE.Color(0))):(this.setColorTween(r.material,r.material.color,new THREE.Color(16777215)),this.setColorTween(s.material,s.material.color,new THREE.Color(16777215))),o.emit(this.el,"changecolor",{style:t,rgb:e,hsv:this.hsv}),o.emit(document.body,"didchangecolor",{style:t,rgb:e,hsv:this.hsv})},hsvToRgb:function(e){var t,i,o,r,s,n,h,l,a=THREE.Math.clamp(e.h,0,1),c=THREE.Math.clamp(e.s,0,1),d=e.v;switch(r=Math.floor(6*a),s=6*a-r,n=d*(1-c),h=d*(1-s*c),l=d*(1-(1-s)*c),r%6){case 0:t=d,i=l,o=n;break;case 1:t=h,i=d,o=n;break;case 2:t=n,i=d,o=l;break;case 3:t=n,i=h,o=d;break;case 4:t=l,i=n,o=d;break;case 5:t=d,i=n,o=h}return{r:Math.round(255*t),g:Math.round(255*i),b:Math.round(255*o)}},update:function(e){this.background.setAttribute("color",this.data.backgroundColor)},tick:function(){},remove:function(){},pause:function(){},play:function(){}}),AFRAME.registerPrimitive("a-colorwheel",{defaultComponents:{colorwheel:{}},mappings:{value:"colorwheel.value",name:"colorwheel.name",disabled:"colorwheel.disabled",color:"colorwheel.color",backgroundcolor:"colorwheel.backgroundColor",showselection:"colorwheel.showSelection",wheelsize:"colorwheel.wheelSize",selectionsize:"colorwheel.selectionSize"}})},function(e,t){e.exports={emit:function(e,t,i){e.dispatchEvent(new CustomEvent(t,{detail:i}))}}}])}]);
//# sourceMappingURL=main.js.map