const { test, expect } = require('@playwright/test');
const { CalculatorStartPage } = require('../pages/calculatorStartPage');

test.describe('', () => {
  let page;
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    startPage = new CalculatorStartPage(page);
  });
  test.beforeEach(async () => {
    await startPage.goto();
  });

  // Global variables used.
  const calcBuildOptions =  ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const selectBuild = '#selectBuild';
  // 0- Add, 1- Substract, 2- Multiply, 3- Divide, 4- Concatenate,
  const operationsDropdownList =  ['0', '1', '2', '3', '4']; 

  //TEST 1 -  checking ADD with all builds
  calcBuildOptions.forEach(selectedOption => {
    test.only(`Check if "ADD" works correctly in build ${selectedOption} `, async () => {
      //Selects build
      await page.selectOption(selectBuild, `${selectedOption}`);

      let num1 = Math.floor(Math.random() * 10);
      await page.fill('#number1Field', num1.toString());
      let num2 = Math.floor(Math.random() * 10);
      await page.fill('#number2Field', num2.toString());
      
      //Selects which which math function to use. 0 - ADD
      await page.selectOption('#selectOperationDropdown', operationsDropdownList[0]);
      await page.click('#calculateButton');

      const expectedAnswer = (num1 + num2).toString();
      const answerField = await page.inputValue('#numberAnswerField');
      expect(answerField).toBe(expectedAnswer);
    });
  });

  //TEST 2 - is number 2 field visible 
  calcBuildOptions.forEach(selectedOption => {
    test.only(`Check if #number2Field is visible in build ${selectedOption} `, async () => {  
      //Selects build
      await page.selectOption(selectBuild, `${selectedOption}`);

      const numb2Field = await page.isDisabled('#number2Field');
      expect(numb2Field).toBe(false);
    });
  });   


    //TEST 3 - is CLEAR button enabled
  calcBuildOptions.forEach(selectedOption => {
    test.only(`Check if CLEAR button enabled in build ${selectedOption} `, async () => {
      //Selects build
      await page.selectOption(selectBuild, `${selectedOption}`);

      const clearButton = await page.isDisabled('#clearButton');
      expect(clearButton).toBe(false);
    });
  });

    //TEST 4 - is "Integers only" button invisible when Concatenate is selected
  calcBuildOptions.forEach(selectedOption => {
    test.only(`Check if "Integers only" btn is disabled when Concatenate is selected in build  ${selectedOption} `, async () => {
      //Selects build
      await page.selectOption(selectBuild, `${selectedOption}`);
    //Selects which math function to use. 0 - Concatenate
      await page.selectOption('#selectOperationDropdown', operationsDropdownList[4]); 

      const intOnlyBtn = await page.isDisabled('#integerSelect');
      expect(intOnlyBtn).toBe(true);
    });
  });

  //TEST 5 - Concatenate
  calcBuildOptions.forEach(selectedOption => {
    test.only(`Check if build ${selectedOption} Concatenates correctly `, async () => {
      //Selects build
      await page.selectOption(selectBuild, `${selectedOption}`);

      let num1 = Math.floor(Math.random() * 10).toString();
      await page.fill('#number1Field', num1);
      let num2 = Math.floor(Math.random() * 10).toString();
      await page.fill('#number2Field', num2);

      //Selects which math function to use. 0 - Concatenate
      await page.selectOption('#selectOperationDropdown', operationsDropdownList[4]); 
      await page.click('#calculateButton');

      const expectedAnswer = (num1 + num2);
      const answerField = await page.inputValue('#numberAnswerField');
      expect(answerField).toBe(expectedAnswer);
    });
  });
});



/*
  //WORKSS // try out with refactoring
  test.only('prototype calc ADD first check', async () => {
    await startPage.goto();

    //await page.selectOption ('#selectBuild','2'); geras
    await page.selectOption(selectBuild, calcBuildOptions[0]);

    let num1 = Math.floor(Math.random() * 10);
    await page.fill('#number1Field', num1.toString());

    let num2 = Math.floor(Math.random() * 10);
    await page.fill('#number2Field', num2.toString());
    await page.selectOption('#selectOperationDropdown', operationsDropdownList[0]);
    await page.click('#calculateButton');

    const expectedAnswer = (num1 + num2).toString();
    const answerField = await page.inputValue('#numberAnswerField');
    
    expect(answerField).toBe(expectedAnswer);
  });

  //-------------------------------------------------------------------------------------------------------------------------------------
*/













