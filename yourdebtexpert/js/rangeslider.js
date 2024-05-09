$(function() {

    var $document = $(document);
    var selector = '[data-rangeslider]';
    var $element = $(selector);

    // For ie8 support
    var textContent = ('textContent' in document) ? 'textContent' : 'innerText';

    // Example functionality to demonstrate a value feedback
    function valueOutput(element) {
        var value = parseInt(element.value, 10);
        var output = element.parentNode.getElementsByTagName('output')[0] || element.parentNode.parentNode.getElementsByTagName('output')[0];
    
        if(value == 1000){
            output[textContent] = "£"+ value.toLocaleString() +' or Less';
        }else if(value == 50000){
            output[textContent] = "£"+ value.toLocaleString() + '+';
        }else{
            output[textContent] = "£"+ value.toLocaleString();
        }
          

   }

    $document.on('input', 'input[type="range"], ' + selector, function(e) {
        valueOutput(e.target);
    });

   


    // Basic rangeslider initialization
    $element.rangeslider({

        // Deactivate the feature detection
        polyfill: false,

        // Callback function
        onInit: function() {
            valueOutput(this.$element[0]);
        },

        // Callback function
        onSlide: function(position, value) {
            console.log('onSlide');
            console.log('position: ' + position, 'value: ' + value);
        },

        // Callback function
        onSlideEnd: function(position, value) {
            console.log('onSlideEnd');
            console.log('position: ' + position, 'value: ' + value);
        }
    });

});


