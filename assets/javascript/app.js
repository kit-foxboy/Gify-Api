var topics = ["Super Mario Bros", "Legend of Zelda", "Star Fox", "Pokemon", "Earthbound"];
var gifCount = 0;

function showSearchTerms() {

    $('#gif-buttons').html('');

    for(var i = 0; i < topics.length; i++) {
        var row = $('<div>').addClass('row').html('<div class="col-lg-12 mt-2"><button type="button" class="btn btn-primary" data-value="' + topics[i] + '">' + topics[i] + '</button></div>');
        $('#gif-buttons').append(row);
    }
}

function fetchGifs(searchTerm) {

    var query = $.param({
        api_key: 'VsJSmPtaudSBTU6BWVEEJ52my5oVumCp',
        q: searchTerm,
        rating: 'pg',
        limit: 6
    });

    $.ajax({
        type: 'GET',
        url: 'https://api.giphy.com/v1/gifs/search?' + query
    }).done(function(response) {
        
        var currentRow = $('<div>').addClass('row mt-2');
        for(var i = 0; i < response.data.length; i++) {

            var gif = $('<img>').addClass('image-fluid')
                .attr('src', response.data[i].images.fixed_height.url)
                .attr('height', '100%')
                .attr('width', '100%');
            
            var col = $('<div>').addClass('col-lg-4');
            $('<div>').addClass('card').append(
                $('<div>').addClass('card-header').html('Rating: ' + response.data[i].rating.toUpperCase())
            ).append(
                $('<div>').addClass('card-body').append(gif)
            ).appendTo(col);

            if(++gifCount == 3) {
                
                gifCount = 0;
                currentRow.append(col);
                $('#gif-results').append(currentRow);
                currentRow = $('<div>').addClass('row mt-2');

            } else {
                currentRow.append(col);
            }

        }
        $('#results-section').removeClass('invisible');

    }).fail(function(error) {

        console.log(error);
        alert('There was a(n) ' + error.statusText + ' retreiving images. Try again later.');
    });
}

$(document).ready(function () {
    showSearchTerms();
});

$(document).on('click', '#gif-buttons button', function() {
    fetchGifs($(this).attr('data-value'));
});

$('#add-term-button').on('click', function(event) {
    event.preventDefault();

    var termInput = $('#search-term');
    topics.push(termInput.val());
    termInput.val('');

    showSearchTerms();
});