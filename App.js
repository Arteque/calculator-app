
//theme Skin Change

const themeChanger = () => {
    if(!document.querySelector(".range input")) return 
    
    const rangeSlider = document.querySelector(".range input")

    rangeSlider.addEventListener("input", (e) => {
    let themeIndex = Number(e.target.value) + 1
    let themeName = "theme-"+themeIndex
    document.body.classList.value = themeName    
    setTheme(themeName)

})

    // Change the range position on load
    rangeSlider.value = Number(getTheme().split("-")[1] - 1)
}


// Theme Color Persist after Loading
const setTheme = (item) => {
    localStorage.setItem("theme", item)
}
const getTheme = () => {
    return localStorage.getItem("theme")
}

//Calculation
const calcNumbers = document.querySelectorAll(".calc-grid .number")
const calcOperator = document.querySelectorAll(".calc-grid .operator")
const calcEqual = document.querySelector(".calc-grid .equal")
const calcReset = document.querySelector(".calc-grid .totalReset")
const calcDel = document.querySelector(".calc-grid .del")
const screen = document.querySelector(".screen-container p")
let resultStat = false
let pattern = /[+\-*\/]/g


// Oparation function
const evaluat = (el) => {
    return new Function('return ' + el)()
}


//The Numbers
calcNumbers.forEach(nmbr => {
    nmbr.addEventListener("click", () => {
        // Check if there is a dot on the screen if the dot btn is clicked
        // a second dot is autho. after "equation" sign

        if(screen.innerText.includes(".") && nmbr.innerText == "." && !screen.innerText.split(".")[1].match(pattern)) return
        
        // check if the screen has no number and the 0 is clicked

        if(screen.innerText.length == 0 && nmbr.innerText == "0") return
        
        //del the default "0" at the begin

        if(screen.innerText == "0") {
            screen.innerText = ""
        }


        // the resulStat Var is true when the result btn is clicked


        if(resultStat) {
            screen.innerText = ""
            resultStat = false
        }
        

        // concat. the clicked element

        screen.innerText += nmbr.innerText
    })
})

// The equation signs
calcOperator.forEach(item => {
    item.addEventListener("click", () => {

        // stop the execution if there is no string
        if(screen.innerText == "" ) return
        
        
        if(screen.innerText == 0)return

        //check the pattern var . The idea here is to avoid the double signs
        //the evaluat function is executed if there is a second equation sign

        if(screen.innerText.match(pattern) && screen.innerText[0] !== "-"){
            screen.innerText = `${evaluat(screen.innerText)}${item.innerText}` 
            return
        }

        // if a equation sign is clicked after the result btn was executed reset the bool resultStat
        if(resultStat){ 
            resultStat = false
        }

        // add numbers and signs
        screen.innerText += item.innerText
    })
})


//The equal sign
calcEqual.addEventListener("click", () => {
    // if the screen is empty stop execution
    if(screen.innerText.length == '' ) return

    // when the screen text has no equation sign, stop the execution
    if(!screen.innerText.match(pattern)) return 

    // evaluat the screen data
    screen.innerText = evaluat(screen.innerText)
    
    resultStat = true
})


// The reset sign
calcReset.addEventListener("click", () => {
    if(screen.innerText == "") return
    screen.innerText = "0"
})


// The del sign
calcDel.addEventListener("click", () => {
    if(screen.innerText == "") {
        screen.innerText = "0"
        return
    }
    if(screen.innerText == "0") return
    if(resultStat) {
        screen.innerText = "0"
        resultStat = false
        return
    }
    let sliceData = screen.innerText.slice(0, -1)
    if(screen.innerHTML.length <= 1){
        screen.innerText = "0"
    }else{
        screen.innerText = sliceData
    }
})


//Init after Loading
// check theme on load
getTheme() && (document.body.classList.value = getTheme())

// Change the Theme color
themeChanger()


