exports.CalculatorStartPage = class CalculatorStartPage {
    constructor(page) {
        this.page = page;
    }

    async goto() {
    await this.page.goto('https://testsheepnz.github.io/BasicCalculator');
    }
 
}