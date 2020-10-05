// https://democracybuilders1.wixsite.com/teach
 
//NEW APPLICATION

import wixData from 'wix-data';
import wixLocation from 'wix-location'
 
$w.onReady(function () {
    //hides table
        $w('#appTable').hide();
        $w('#text45').hide();
});
 
export function button10_click(event) {
    //Looks through the properties database to find the information for the entered APP ID and displays it
    wixData.query('Properties')
.contains('_id', $w('#appID').value)
.find()
   .then(res => {   
      $w('#appTable').rows = res.items; 
      $w('#appTable').show();
    });
}
 
export function button11_click(event) {
    //shows submitted confirmation text
     $w('#text45').show();
    //stores APP ID entered, goes through Properties databgase to find APP ID , finds Street Name for that ID and stores it  
    let houseID = $w('#appID').value;
console.log(houseID);
wixData.query('Properties')
 .eq("_id", houseID)
    .find()
    .then(res => {
        let firstItem = res.items[0].streetName ;
console.log(firstItem);
 
//stores value of what user entered to appropriate column in ApplicationnPAge database
let toSave = {
    "propertyId":$w('#appID').value,
    "firstName": $w('#input1').value,
    "lastName":$w('#input2').value,
   "streetName": firstItem };
console.log(toSave);
 wixData.insert('ApplicationPage',toSave)
 
 //sends user to Existing Application Page
  wixLocation.to("/application-page-existing");
} );
}
 
 
// EXISTING APPLICATION 
import wixData from 'wix-data';
import wixLocation from 'wix-location';

$w.onReady(function () {
        $w('#appTable1').hide();
});
 
export function appButton1_click(event) {
    //Add your code for this event here: 
        wixData.query('Properties')
.contains('_id', $w('#appID').value)
.find()
   .then(res => {   
      $w('#appTable1').rows = res.items; 
      $w('#appTable1').show();
    });
}

export function submitButton1_click(event) {
 
    $w('#dynamicDataset').setFilter(     
        wixData.filter()       
              .eq('propertyId', $w('#appID').value)
)
// Process result
.then(() => {     
    console.log($w('#appID').value);
    console.log($w('#input1').value);
    console.log($w('#input2').value);
 
let currentItem = $w("#dynamicDataset").getCurrentItem();
    console.log(currentItem);
 
 // Record to update
    $w("#dynamicDataset").setFieldValue("firstName", $w('#input1').value);
    return $w("#dynamicDataset").save(); 
})
.then((savedItem) => {
    console.log(savedItem);
})
 
wixLocation.to('/application-page-existing');
}
 
//PROPERTY SEARCH
 
import wixData from 'wix-data';
import wixLocation from 'wix-location';
 
$w.onReady(function () { 
  //TODO: import wixData from 'wix-data'; 
});
  //searches through Properties database, shows housing in table based on what user inputs
export function searchButton_click(event) {
wixData.query('Properties')
   .contains('city', $w('#search1').value)
   .or(wixData.query('Properties').contains('streetName',$w('#search1').value))
   .or(wixData.query('Properties').contains('projectName',$w('#search1').value))
   .and(wixData.query('Properties').contains('bedrooms',$w('#search3').value))
   .and(wixData.query('Properties').contains('housingType',$w('#search2').value))
   .find()
   .then(res => {   
      $w('#table1').rows = res.items; 
    });
}
 
//INDIVIDUAL PROPERTY
import wixData from 'wix-data';
 
$w.onReady(function () {
  //hides certain text
 $w("#mort").hide();
 $w("#mortgageNum").hide();
 $w("#rent").hide();
$w("#rentNum").hide();
$w('#asking').hide();
$w('#askP').hide();
 
//gets housing type for current housing displayed
$w("#dynamicDataset").onReady( () => {
 let housingT = $w("#dynamicDataset").getCurrentItem().housingType;
console.log(housingT);
//if housing type is rental it shows the rent info, if not then it'll show mortgage info
  if (housingT === 'Rental')
  {    
    $w("#rent").show();            
    $w("#rentNum").show(); }  
    else {    
    $w("#mort").show();       
     $w("#mortgageNum").show(); 
     $w('#asking').show();
     $w('#askP').show();
     }  
});
});
 
 
 
 
 
 
 

