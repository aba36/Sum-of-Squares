/**
 ** 
 **      File Name: squares.js
 **    Module Name: squares
 **        Creator: Jacob Solomon
 **  Creation Date: 09-June-2020
 **    Modified By:
 **    
 **  DESCRIPTION:
 **    
 **    Sum of Squares
 **    
 **    This script is used to calculate the sum of the squares adding up to a given
 **    integer, where 1 is a square 1=1**2. All of the numbers in the sum must be
 **    squares. The objective is not only to find out the sum of squares which will
 **    add up to the value of the integer passed, but also to minimize the number
 **    of squares used in the sum.
 **    
 **    Write a function that will take as its input an integer > 0 and output an
 **    array of integers whose sum will equal to the input integer.
 **    
 **    Note: the trivial solution to any problem would be [1,1,1,1...n], adding up
 **          to the value of the input integer, however, this will result in the
 **          longest solution and so it should not be used. However, it is OK to
 **          pad the solution with ones to achieve the desired sum, but there
 **          cannot be more than three ones since four ones should be replace by 4
 **    
 **    Example:
 **     For integer == 12 - the possible solutions are: [9,1,1,1] and [4,4,4],
 **     both add up to 12, however, we need to return the smaller array in this
 **     case [4,4,4]
 **    
 **      Note: a square can be listed multiple times.
 **    
 **    
 **   USED BY:
 **    
 **    
 **  DEPENDENCIES:
 **    
 **    None
 **    
 **    
 **  METHODS:
 **    
 **    function findSquares(num) - computes the desired squares sum and returns an array
 **    
 **    
 **  LIMITATIONS & ASSUMPTIONS:
 **
 **  1) Invalid inputs are all non-integers and integers < 1. If input
 **     is invalid return [-1], that would be null, char, float, and values < 1
 **
 **  2) The strategy we will use is:
 **     a) Find out all of the possible squares N such that N** <= input integer
 **         and push them into an array
 **     b) Reverse sort the squares array
 **     c) Starting with the largest square, find all of the possible combinations
 **        you can add up all remaining squares to form the desired sum.
 **        Repeat this for each and every element of the squares array.
 **        Note that this will generate multiple array solutions.
 **     d) Scan through the array of solutions in (c) and find out the shortest
 **        array. The shortest array will be the desired solution.
 **
 **
 ****************************************************************/

'use strict';

function findSquares(num){

    if((num === undefined)|| (!Number.isInteger(num)) ||(num<1)){
        // invalid input
        return([-1])
    }

    // These are the 3 trivial cases: 1,2, & 3, will handle them by exception
    if (num < 4){
        let xx=[];
        for(let i=1; i <=num; i++){
            xx.push(1);
        }
        return(xx);
    }

    // at this point num >= 4

    let squares = [];

    // create the squares array, this will be all possible squares
    // in the range of up to the input integer num.
    for (let i=2; i<num; i++){

        const sq = i**2;
        if (sq <= num){
            squares.push(sq);
        }
        else{
            // square is greater than num
            break;
        }
    }

    // reverse sort
    squares.sort(function (y, x) {
        return x - y;
    });

    // At this point squares have all of the possible squares
    // Next build arrays with all possible sums of the squares plus ones as needed

    let allArr = [];

    for(let i1=0; i1 < squares.length; i1++){
        let sum = squares[i1];
        allArr.push([sum]);

        for(let i2=0; i2 < squares.length; i2++){
            let val = squares[i2];

            if((sum + val) > num){
                // do nothing
                continue;
            }
            else if((sum + val) < num){
                // add val as much as you can without going over
                sum += addValue(allArr[i1],val,(num - sum));
                continue;
            }
            else{
                // we have a match
                allArr[i1].push(val);
                sum += val;
                break;
            }
        }

        // find out if we need to pad with ones
        addOne(allArr[i1],(num - sum));
    }

    let sml;
    let idx;

    // find the shortest array
    for(let n=0; n < allArr.length; n++){
        let tmpsml = allArr[n].length;
        let tmpidx = n;

        if(n==0){
            // this is the first loop
            sml = tmpsml;
            idx = tmpidx;
            continue;
        }

        if(tmpsml < sml){
            sml = tmpsml;
            idx = tmpidx;
        }
    }

    // reverse sort the array answer for better presentation
    allArr[idx].sort(function (y, x) {
        return x - y;
    });

    return(allArr[idx]);
}

// this function keeps adding the same square to the sum up to sum <= num
function addValue(lrr,val,max){

    let tot = val;

    while(tot <= max){
        lrr.push(val);
        tot += val;
    }

    return(tot-val);
}

// pad the array with ones as needed.
function addOne(lrr,max){

    for (let s=1; s<= max; s++){
        lrr.push(1);
    }
}


/**
 * This is the testing section.
 * 
 */

// The following is used to allow user input to get an integer
//  the integer will be used as an input into function: findSquares(int)
const regex = /^[0-9]+$/;
let arr;

let answer;

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Enter an integer greater than zero: ", function(res) {
    answer = res;
    if((answer === undefined) || (!regex.test(answer))){
        // invalid input was detected, close readline.

        // Note: calling rl.close causes the function to exit and transfer
        //  control to the rl.on event handler. findSquares will not be called
        rl.close();
    }

    arr = findSquares(Number(answer));
    rl.close();
});

rl.on("close", function() {
    let buf = arr;
    if((arr === undefined) || arr[0] === -1){
        buf = 'ERROR: You must enter an integer greater than zero';
        console.log('\n',buf);
        process.exit(0);
    }
    console.log(`\nInteger=>${answer}, array=>`,buf);
    process.exit(0);
});