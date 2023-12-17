class Calculator {
    constructor(prevOpTextEl, currOpTextEl) {
        this.prevOpTextEl = prevOpTextEl
        this.currOpTextEl = currOpTextEl
        this.clear()
    }

    clear() {
        this.currOp = ''
        this.prevOp = ''
        this.operation = undefined
    }

    delete() {
        this.currOp = this.currOp.toString().slice(0, -1)
    }

    appendNumber(number) {
        if (number === '.' && this.currOp.includes('.')) return
        this.currOp = this.currOp.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.currOp === '') return
        if (this.prevOp !== '') {
            this.compute()
        }
        this.operation = operation
        this.prevOp = this.currOp
        this.currOp = ''
    }

    compute() {
        let computation
        const prev = parseFloat(this.prevOp)
        const curr = parseFloat(this.currOp)

        if (isNaN(prev) || isNaN(curr)) return

        switch (this.operation) {
            case '+':
                computation = prev + curr
                break
            case '-':
                computation = prev - curr
                break
            case 'x':
                computation = prev * curr
                break
            case '÷':
                computation = prev / curr
                break
            default:
                return
        }

        this.currOp = computation
        this.operation = undefined
        this.prevOp = ''
    }

    getDisplayNumber(number) {
        const stringNum = number.toString()
        const integerDigits = parseFloat(stringNum.split('.')[0])
        const decimalDigits = stringNum.split('.')[1]

        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en',
                { maximumFractionDigits: 0 })
        }

        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.currOpTextEl.innerText =
            this.getDisplayNumber(this.currOp)
        if (this.operation != null) {
            this.prevOpTextEl.innerText =
                `${this.getDisplayNumber(this.prevOp)} ${this.operation} `
        } else {
            this.prevOpTextEl.innerText = ''
        }
    }
}

const numberButtons = document.querySelectorAll('[data-numbers]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const prevOpTextEl = document.querySelector('[data-prev-operand]')
const currOpTextEl = document.querySelector('[data-curr-operand]')

const calculator = new Calculator(prevOpTextEl, currOpTextEl)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

allClearButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})


operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalButton.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})