import './index.css'
import iconset from './icons.json'

const iconContainer = document.querySelector("#icon-list");
const actionFooter = document.querySelector("#action-footer");
const iconCategory = document.querySelector("#icon-category");
const iconName = document.querySelector("#icon-name");
const downloadIconButton = document.querySelector("#download-icon-btn");
const svgSelector = document.querySelector(".svg-selection");
const pngSelector = document.querySelector(".png-selection");
iconCategory.innerHTML = "";
iconName.innerHTML = "";
let categories = '';
const iconsPerRow = 5;

console.log(images)
iconset.forEach((category, index) => {
    let rows = '';
    const rowCount = Math.ceil(Number(category.icons.length/iconsPerRow));
    const iconCount = category.icons.length;
    const lastRowIconCount = iconCount%iconsPerRow===0?iconsPerRow:iconCount%iconsPerRow;
    for (let i=0; i<rowCount; i++){
        let icons = '';
        const isLastRow = (i===rowCount-1);
        let iconClassnames = `"hover:bg-ftGrey-200 w-20 h-20 cursor-pointer p-4 rounded-[12px] flex justify-center items-center relative icon"`;
        let dummyIconClassnames = `"hover:bg-ftGrey-200 w-20 h-20 p-4 rounded-[12px] opacity-0 flex justify-center items-center relative"`;
        for (let j = 0; j < iconsPerRow; j++) {
            if(!isLastRow) {
                icons += 
                `<div class=${iconClassnames} data-index=${index+'-'+(i*iconsPerRow + j)}>
                    <img class="w-full" src=${category.icons[i*iconsPerRow + j].outlinePath} alt="">
                </div>`
            }
            // If last row, add dummy icons to the empty slots
            else {
                if(j<lastRowIconCount) {
                    icons += 
                    `<div class=${iconClassnames} data-index=${index+'-'+(i*iconsPerRow + j)}>
                        <img class="w-full" src=${category.icons[i*iconsPerRow + j].outlinePath} alt="">
                    </div>`
                }
                else {
                    icons += 
                    `<div class=${dummyIconClassnames}>
                        <img class="w-full" src="./src/assets/icons/headset_basic.svg" alt="">
                    </div>`
                }
            }
        }
        const row = `<div class="flex flex-wrap mt-12 justify-between">${icons}</div>`
        rows += row
    }

    
    categories += 
    `<div class="mt-24">
        <div class="icon-header flex justify-between items-center">
        <h2 class="heading-2 blue-gradient-1 inline-block bg-clip-text text-transparent">${category.categoryName}</h2>
        <button class="ghost-button">
            <svg width="11" height="13" viewBox="0 0 11 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
                d="M6.5 1C6.5 0.447715 6.05228 0 5.5 0C4.94772 0 4.5 0.447715 4.5 1V9.45537L1.61399 7.21069C1.17804 6.87162 0.549764 6.95016 0.210694 7.38611C-0.128376 7.82205 -0.0498418 8.45033 0.386105 8.7894L4.27217 11.8119C4.99439 12.3736 6.00571 12.3736 6.72793 11.8119L10.614 8.7894C11.0499 8.45033 11.1285 7.82205 10.7894 7.38611C10.4503 6.95016 9.82205 6.87162 9.38611 7.21069L6.5 9.45544V1Z"
                fill="#8C8DAF" />
            </svg>
            <span class="ml-2">DOWNLOAD</span>
        </button>
        </div>
        <div class="icon-wrap">
            ${rows}
        </div>
  </div>`
    
});

iconContainer.innerHTML = categories

const icons = document.getElementsByClassName('icon');
addEventListenerList(icons, 'click', selectIcon);

function selectIcon(e) {
    const selectedIcon = e.currentTarget;
    for (let i = 0, len = icons.length; i < len; i++) {
        icons[i].style.cssText = '';
    }
    selectedIcon.style.cssText = "box-shadow: 0 1px 0 0 rgba(82, 84, 209, 0.25), 0 -1px 0 0 rgba(132, 92, 216, 0.25), 1px 0 0 0 rgba(82, 84, 209, 0.25), -1px 0 0 0 rgba(132, 92, 216, 0.25), 1px -1px 0 0 rgba(107, 88, 212, 0.5), -1px 1px 0 0 rgba(107, 88, 212, 0.5), 1px 1px 0 0 rgba(56, 79, 205, 0.75), -1px -1px 0 0 rgba(157, 96, 219, 0.75);"
    const iconIndices = e.currentTarget.dataset.index;
    const categoryIndex = iconIndices.split("-")[0];
    const iconIndex = iconIndices.split("-")[1];
    iconCategory.innerHTML = `${iconset[categoryIndex].categoryShortName} / `;
    iconName.innerHTML = iconset[categoryIndex].icons[iconIndex].name;
    downloadIconButton.dataset.index = e.currentTarget.dataset.index;
    actionFooter.classList.remove("hide");
    actionFooter.classList.add("show");
}

function clearIconSelection(e) {
    const elClass = e.target.classList;
    const elParentClass = e.target.parentElement.classList;
    // if(elClass.contains("icon") || elParentClass.contains("icon") || elClass.contains("download-icon") || elParentClass.contains("download-icon") || elClass.contains("dummy-anchor")) {
    if(elClass.contains("icon") || elParentClass.contains("icon") || actionFooter.contains(e.target) || elClass.contains("dummy-anchor")) {
        return;
    }
    else {
        for (let i = 0, len = icons.length; i < len; i++) {
            icons[i].style.cssText = '';
        }
        actionFooter.classList.remove("show");
        actionFooter.classList.add("hide");

    }
}

function addEventListenerList(list, event, fn) {
    for (let i = 0, len = list.length; i < len; i++) {
        list[i].addEventListener(event, fn, false);
    }
}

document.addEventListener("click", clearIconSelection);
document.onkeydown = function(evt) {
    evt = evt || window.event;
    if (evt.key === "Escape") {
        clearIconSelection(evt)
    }
};

function downloadIcon(e) {
    const iconIndices = e.currentTarget.dataset.index;
    const categoryIndex = iconIndices.split("-")[0];
    const iconIndex = iconIndices.split("-")[1];
    let iconPath = '';
    if(svgSelector.classList.contains("active")){
        iconPath = iconset[categoryIndex].icons[iconIndex].outlinePath;
    }
    else {
        iconPath = iconset[categoryIndex].icons[iconIndex].outlinePath.replaceAll("svg","png");
        console.log(iconPath)
    }
    const iconName = iconset[categoryIndex].icons[iconIndex].name;
    const anchor = document.createElement("a");
    anchor.href = iconPath;
    anchor.className = "dummy-anchor"
    anchor.download = iconName;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
}

downloadIconButton.addEventListener("click", downloadIcon)

function iconFormatSelection(e,format) {
    if(format==="svg"){
        if(!svgSelector.classList.contains("active")) {
            svgSelector.classList.add("active");
            pngSelector.classList.remove("active");
        }
    }
    else if(format==="png"){
        if(!pngSelector.classList.contains("active")) {
            pngSelector.classList.add("active");
            svgSelector.classList.remove("active");
        }
    }
}

svgSelector.addEventListener("click", (e)=>iconFormatSelection(e,'svg'));
pngSelector.addEventListener("click", (e)=>iconFormatSelection(e,'png'));