import './index.css'
import iconsetLine from './icons.json'
import iconsetSolid from './iconsSolid.json'

const iconContainer = document.querySelector("#icon-list");
const iconContainer2 = document.querySelector("#icon-list-2");
const actionFooter = document.querySelector("#action-footer");
const iconCategory = document.querySelector("#icon-category");
const iconName = document.querySelector("#icon-name");
const heroSection = document.querySelector("#hero-section");
const downloadIconButton = document.querySelector("#download-icon-btn");
const svgSelector = document.querySelector(".svg-selection");
const pngSelector = document.querySelector(".png-selection");
const lineTab = document.querySelector(".line-tab");
const solidTab = document.querySelector(".solid-tab");
const light = document.querySelector("#light");
const screenWidth = window.innerWidth;
iconCategory.innerHTML = "";
iconName.innerHTML = "";
const iconsPerRow = screenWidth>640?5:screenWidth>346?3:2;

function populateIcons(type) {
    let categories = '';
    let icons = [];
    type==="line"? (icons = iconsetLine) : (icons = iconsetSolid)
    icons.forEach((category, index) => {
        let rows = '';
        const rowCount = Math.ceil(Number(category.icons.length/iconsPerRow));
        const iconCount = category.icons.length;
        const lastRowIconCount = iconCount%iconsPerRow===0?iconsPerRow:iconCount%iconsPerRow;
        for (let i=0; i<rowCount; i++){
            let icons = '';
            const isLastRow = (i===rowCount-1);
            let iconClassnames = `hover:bg-ftGrey-200 w-24 h-24 cursor-pointer p-6 rounded-[12px] flex justify-center items-center relative icon`;
            let dummyIconClassnames = `hover:bg-ftGrey-200 w-24 h-24 p-6 rounded-[12px] opacity-0 flex justify-center items-center relative`;
            for (let j = 0; j < iconsPerRow; j++) {
                let icon = category.icons[i*iconsPerRow + j];
                if(!isLastRow) {
                    icons += 
                    `<div class="${iconClassnames} ${icon.blurred && "pointer-events-none"}" data-index=${index+'-'+(i*iconsPerRow + j)+'-'+(type==="line"?'0':'1')}>
                        <img class="w-full ${icon.blurred?'':'brightness-0 invert invert-image'} opacity-90" src=${icon.path} alt="">
                    </div>`
                }
                // If last row, add dummy icons to the empty slots
                else {
                    if(j<lastRowIconCount) {
                        icons += 
                        `<div class="${iconClassnames} ${icon.blurred && "pointer-events-none"}" data-index=${index+'-'+(i*iconsPerRow + j)+'-'+(type==="line"?'0':'1')} >
                            <img class="w-full ${icon.blurred?'':'brightness-0 invert invert-image'} opacity-90" src=${icon.path} alt="">
                        </div>`
                    }
                    else {
                        icons += 
                        `<div class="${dummyIconClassnames} pointer-events-none">
                            <img class="w-full" src="./src/assets/icons/headset_basic.svg" alt="">
                        </div>`
                    }
                }
            }
            const row = `<div class="flex flex-wrap mt-12 justify-between">${icons}</div>`
            rows += row
        }
    
        
        categories += 
        `<div class="mt-32">
            <div class="icon-header flex justify-between items-center">
            <h2 class="heading-2 blue-gradient-2 inline-block bg-clip-text text-transparent">${category.categoryName}</h2>
            ${
                type==="line" ?
                `<button class="ghost-button category-download-btn hidden md:flex" data-index=${index}>
                <svg width="11" height="13" viewBox="0 0 11 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M6.5 1C6.5 0.447715 6.05228 0 5.5 0C4.94772 0 4.5 0.447715 4.5 1V9.45537L1.61399 7.21069C1.17804 6.87162 0.549764 6.95016 0.210694 7.38611C-0.128376 7.82205 -0.0498418 8.45033 0.386105 8.7894L4.27217 11.8119C4.99439 12.3736 6.00571 12.3736 6.72793 11.8119L10.614 8.7894C11.0499 8.45033 11.1285 7.82205 10.7894 7.38611C10.4503 6.95016 9.82205 6.87162 9.38611 7.21069L6.5 9.45544V1Z"
                    fill="#8C8DAF" />
                </svg>
                <span class="ml-2">DOWNLOAD</span>
            </button>`:
            `
            <a href="https://vaisakhpradeep.gumroad.com/l/futicons" target="_blank" class="hidden md:inline-block">
            <button class="ghost-button" data-index=${index}>
                <svg width="11" height="13" viewBox="0 0 11 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M6.5 1C6.5 0.447715 6.05228 0 5.5 0C4.94772 0 4.5 0.447715 4.5 1V9.45537L1.61399 7.21069C1.17804 6.87162 0.549764 6.95016 0.210694 7.38611C-0.128376 7.82205 -0.0498418 8.45033 0.386105 8.7894L4.27217 11.8119C4.99439 12.3736 6.00571 12.3736 6.72793 11.8119L10.614 8.7894C11.0499 8.45033 11.1285 7.82205 10.7894 7.38611C10.4503 6.95016 9.82205 6.87162 9.38611 7.21069L6.5 9.45544V1Z"
                    fill="#8C8DAF" />
                </svg>
                <span class="ml-2">FULL DOWNLOAD</span>
            </button>
            </a>
            `
            }
            
            </div>
            <div class="icon-wrap">
                ${rows}
            </div>
      </div>`
    
    });

    return categories
}

iconContainer.innerHTML = populateIcons("line");
iconContainer2.innerHTML = populateIcons("solid");

const icons = document.getElementsByClassName('icon');
const categoryDownloadBtns = document.getElementsByClassName('category-download-btn');
addEventListenerList(icons, 'click', selectIcon);
addEventListenerList(categoryDownloadBtns, 'click', downloadCategoryIcons)

function selectIcon(e) {
    const selectedIcon = e.currentTarget;
    for (let i = 0, len = icons.length; i < len; i++) {
        icons[i].style.cssText = '';
    }
    selectedIcon.style.cssText = "box-shadow: 0 1px 0 0 rgba(82, 84, 209, 0.25), 0 -1px 0 0 rgba(132, 92, 216, 0.25), 1px 0 0 0 rgba(82, 84, 209, 0.25), -1px 0 0 0 rgba(132, 92, 216, 0.25), 1px -1px 0 0 rgba(107, 88, 212, 0.5), -1px 1px 0 0 rgba(107, 88, 212, 0.5), 1px 1px 0 0 rgba(56, 79, 205, 0.75), -1px -1px 0 0 rgba(157, 96, 219, 0.75);"
    const iconIndices = e.currentTarget.dataset.index;
    const categoryIndex = iconIndices.split("-")[0];
    const iconIndex = iconIndices.split("-")[1];
    iconCategory.innerHTML = `${iconsetLine[categoryIndex].categoryShortName} / `;
    iconName.innerHTML = iconsetLine[categoryIndex].icons[iconIndex].name;
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
    const iconType = iconIndices.split("-")[2];
    let iconPath = '';
    let icons = [];
    iconType==='0'?(icons = iconsetLine):(icons = iconsetSolid);
    if(svgSelector.classList.contains("active")){
        iconPath = icons[categoryIndex].icons[iconIndex].path;
    }
    else {
        iconPath = icons[categoryIndex].icons[iconIndex].path.replaceAll("svg","png");
    }
    const iconName = icons[categoryIndex].icons[iconIndex].name;
    download(iconPath, iconName);
}

function downloadCategoryIcons(e) {
    const categoryIndex = e.currentTarget.dataset.index;
    const categoryPath = iconsetLine[categoryIndex].iconPackagePath;
    const categoryName = iconsetLine[categoryIndex].categoryName;
    download(categoryPath, categoryName);
}

function download(path, name) {
    const anchor = document.createElement("a");
    anchor.href = path;
    anchor.className = "dummy-anchor"
    anchor.download = name;
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


heroSection.addEventListener("mousemove", moveLight)

function moveLight(e) {
    light.style.top = e.clientY-112+"px";
    light.style.left = e.clientX-112+"px";
}

function tabSwitching(format) {
    if(format==="line-tab"){
        iconContainer.style.display = "block";
        iconContainer2.style.display = "none";
        if(!lineTab.classList.contains("active")) {
            lineTab.classList.add("active");
            solidTab.classList.remove("active");
        }
    }
    else if(format==="solid-tab"){
        iconContainer.style.display = "none";
        iconContainer2.style.display = "block";
        if(!solidTab.classList.contains("active")) {
            solidTab.classList.add("active");
            lineTab.classList.remove("active");
        }
    }
}

lineTab.addEventListener("click", ()=>tabSwitching('line-tab'));
solidTab.addEventListener("click", ()=>tabSwitching('solid-tab'));