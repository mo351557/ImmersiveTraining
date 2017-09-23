var fs=require('fs');
var ln = require('readline').createInterface({
  input: fs.createReadStream('Food.csv')
});

var country = ['Netherlands', 'Canada', 'United Kingdom' , 'United States' , 'Australia' , 'France' , 'Germany' , 'Spain', 'South Africa'];
var data=[],final_c=[];
var sugarindex=0,saltindex=0,countryindex=0,countryv = 0,sugar = 0,salt = 0,i=0;

var sugarv = Array(9).fill(0);
var saltv = Array(9).fill(0);

ln.on('line', function (line) {
  data=line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
 // data=line.split(',');


while(i<1) 
  {
    countryindex=data.indexOf('countries_en');
    sugarindex=data.indexOf('sugars_100g');
    saltindex=data.indexOf('salt_100g');
    i++;
  }

countryv=data[countryindex];
//console.log("arul"+countryv);
sugar=data[sugarindex];
//console.log(sugar);
salt=data[saltindex];
   if(salt=="") salt=0;
     if(sugar=="") sugar=0;
 

var index=country.indexOf(countryv);
     if(index!=-1)
     {
      sugarv[index]+=parseFloat(sugar);
      saltv[index]+=parseFloat(salt);
    }
});

ln.on('close', function() {
  for(var h=0;h<country.length;h++) {
    final_c.push({Country:country[h],
    Sugar:sugarv[h],
    Salt:saltv[h]
  });
    //console.log(country[h]+" "+sugarv[h]+" "+saltv[h]);
}    

console.log(final_c);
fs.writeFile('chart1.json', JSON.stringify(final_c));    


//console.log(JSON.stringify(final_c));
});