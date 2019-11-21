This a JSON merger function which is used to merge json on multiple files and merge it to one whole full lot of object file. This functionality requires the following are to be satisfied while running.

1. This Feature Requires Node.js Environment 
2. A directory where all the atomic json files are kept
3. All the json should contain only Array of Objects
4. All the json files needs to be saved with a common name. Eg data1.json, data2.json, data3.json,... 
5. A list of arguments are to be given while running the code. They are:
	
	a. Path to Directory (correct path to directory containing all input files)
 	b. Input File Base Name (for the example given above is : data)
	c. Output File Name (just the name not the extension Eg: output)
	d. Max File Size (in bytes Eg: 125kb is 128000)

Open Command Prompt or Terminal
Command for Executing program:
node merge.js /root/JSON data output 128000
              <--------> <--> <----> <---->
		   		  a        b     c      d
					 
Replace a,b,c,d with ur values respectively.

My approach is Brute-force since JSON provides data in key value pairs. So keys wont repeat. Only the elemnts per key will change.
Complexity of my approach:
Total no.of unique keys across every input file * Total no of records associated with each key

so complexity is O(k * m * n)

k - no of files
m - no of keys
n - no of values per key
