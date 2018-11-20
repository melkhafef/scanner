 const langCInput = document.querySelector('#langCInput');
 const scannerOutput = document.querySelector('#scannerOutput');
 const startScan = document.querySelector('#startScan');
 scannerOutput.disabled = true;
 const keyWords = ['int', 'float', 'for', 'while', 'switch','String','else','if'];
 const specialChars = [{
         symbol: '=',
         name: 'assign'
     },
     {
         symbol: '+',
         name: 'op'
     },
     {
         symbol: '-',
         name: 'op'
     },
     {
         symbol: '*',
         name: 'op'
     },
     {
         symbol: '/',
         name: 'op'
     },
     {
         symbol: '%',
         name: 'op'
     },
     {
         symbol: '(',
         name: '('
     },
     {
         symbol: ')',
         name: ')'
     },
     {
         symbol: '[',
         name: '['
     },
     {
         symbol: ']',
         name: ']'
     },
     {
         symbol: ';',
         name: ';'
     },
     {
         symbol: '==',
         name: 'comparison'
     },
     {
         symbol: '<=',
         name: 'comparison'
     },
     {
         symbol: '>=',
         name: 'comparison'
     },
     {
         symbol: '!=',
         name: 'comparison'
     },
     {
         symbol: '>',
         name: 'comparison'
     },
     {
         symbol: '<',
         name: 'comparison'
     },
     {
         symbol: '&&',
         name: '&&'
     },
     {
         symbol: '||',
         name: '||'
     },
     {
         symbol: '++',
         name: '++'
     },
     {
         symbol: '--',
         name: '--'
     },
     {
         symbol: '{',
         name: '{'
     },
     {
         symbol: '}',
         name: '}'
     },
 ]
 startScan.addEventListener('click', function () {
     scanner(langCInput.value);
 })

 function scanner(input) {
     validIdFirst = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r',
         's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '_'
     ];
     validId = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r',
         's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '_', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
     ];
     identifies=[];
     validFirstChar = false;
     countValid = 0;
     idNumber = 0;
     string = '';
     scannerOutput.innerHTML = '';
     input = input.split('');
    input.push(' ');
     for(o=0;o<input.length;o++){
         if(input[o]==='\n'){
             input[o]=' ';
         }
     }
     for(o=0;o<input.length;o++){
         if (input[o] === `"`) {
             for (; input[o + 1] !== `"`;) {
                 input[o] = input[o] + input[o + 1];
                 if(input.length<3+o){
                     break;
                 }
                 input.splice(o + 1, 1);
             }
             if (input.length > 2+o) {
                 input[o] = input[o] + input[o + 1];
                 input.splice(o + 1, 1);
             }

         }
     }
 
     for (i = 0; i < input.length; i++) {
         if (input[i] !== ' ') {
             string += input[i];
         } else {
if(string!==''){
             valid = false;
             for (k = 0; k < keyWords.length; k++) {
                 if (string === keyWords[k]) {
                     tokenName = keyWords[k];
                     attributeValue = keyWords[k];
                     scannerOutput.insertAdjacentHTML('beforeend', `<div class='token'> < ${tokenName} ; ' ${attributeValue} ' > </div>`);
                     valid = true;
                 }
             }
             if (valid === false) {
                 for (l = 0; l < specialChars.length; l++) {
                     console.log('reach for');
                     if (string === specialChars[l].symbol) {
                         tokenName = specialChars[l].name;
                         attributeValue = specialChars[l].symbol;
                         scannerOutput.insertAdjacentHTML('beforeend', `<div class='token'> < ${tokenName} ; ' ${attributeValue} ' > </div>`);
                         valid = true;
                     }
                 }
             }
             if (valid === false) {
                 countValid = 0;
                 validFirstChar = false;
                 for (p = 0; p < string.length; p++) {
                     for (j = 0; j < validId.length; j++) {
                         if (string[p] === validId[j]) {
                             countValid++;
                         }
                     }
                 }
                 for (q = 0; q < validId.length; q++) {
                     if (string[0] === validIdFirst[q]) {
                         validFirstChar = true;
                     }
                 }
                 if (validFirstChar === true && string.length < 32 && string.length >= 1 && countValid === string.length && string !== ' ') {
                     count=0;
                    identifies.push({
                    name: string,
                    number: idNumber
                                       })
                                       for(g=0;g<identifies.length;g++){
                    if (string === identifies[g].name){
                        idNumber = identifies[g].number;
                        count++;
                    }
    
                    
                                       }
                    tokenName = 'identifier';
                    if(count<2){
                        idNumber++;
                    }
                     attributeValue = idNumber;
                     scannerOutput.insertAdjacentHTML('beforeend', `<div class='token'> < ${tokenName} ; ' ${attributeValue} ' > </div>`);
                     valid = true;
                 }
             }
             if (valid === false) {
                 if (!isNaN(string) && string !== ' ' && string.length >= 1) {
                     tokenName = 'number';
                     attributeValue = string;
                     scannerOutput.insertAdjacentHTML('beforeend', `<div class='token'> < ${tokenName} ; ' ${attributeValue} ' > </div>`);
                     valid = true;

                 }
             }
             if (valid === false) {
                 if (string[0]===`"` && string[string.length-1]===`"`) {
                     tokenName = 'literal';
                     attributeValue = string;
                     scannerOutput.insertAdjacentHTML('beforeend', `<div class='token'> < ${tokenName} ; ${attributeValue}  > </div>`);
                     valid = true;
                 }
             }
             if (valid === false) {
                     tokenName = 'ERROR';
                     attributeValue = string;
                     scannerOutput.insertAdjacentHTML('beforeend', `<div class='token error'> < ${tokenName} ; ' ${attributeValue} '  > </div>`);
                     valid = true;
                 
             }
             string = '';
}
         }
     }
 }
 