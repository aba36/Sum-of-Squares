## Sum of Squares

### Description:

- This script is used to calculate the sum of the squares adding up to a given
  integer, where 1 is a square 1=1**2. All of the numbers in the sum must be
  squares. The objective is not only to find out the sum of squares which will
  add up to the value of the integer passed, but also to minimize the number
  of squares used in the sum.
  
-  Write a function that will take as its input an integer > 0 and output an
  array of integers whose sum will equal to the input integer.
  
-  Note: the trivial solution to any problem would be [1,1,1,1...n], adding up
       to the value of the input integer, however, this will result in the
        longest solution and so it should not be used. However, it is OK to
        pad the solution with ones to achieve the desired sum, but there
        cannot be more than three ones since four ones should be replace by 4
  
-  Example:
  For integer == 12 - the possible solutions are: [9,1,1,1] and [4,4,4],
   both add up to 12, however, we need to return the smaller array in this
   case [4,4,4]


### Files/scripts description:

##### The node js tracking module:

- squares.js - the Node.js/JavaScript script which finds a solution to the problem.



##### How to run:

- If you have Node js installed on your system you can just to:
node squares.js

- If you don't have Node js installed there are 3 executables in the exe dir as follows:
    - squares-win.exe - executable for Windows
    - squares-macos - executable for Mac
    - squares-linux - executable for Linux
- To execute on Linux, for example, do:
    - ./squares-linux