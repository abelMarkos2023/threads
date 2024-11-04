Array.from(Array(5).keys()).forEach((i) => {
    setTimeout(function() {
    console.log(i+1);
    }, i * 1000);
   });