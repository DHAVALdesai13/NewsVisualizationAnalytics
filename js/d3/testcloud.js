
function wordCloud(selector) {

    var fill = d3.scale.category20();

    //Construct the word cloud's SVG element
    var svg = d3.select(selector).append("svg")
        .attr("width", 500)
        .attr("height", 300)
        .append("g")
        .attr("transform", "translate(200,200)");


    //Draw the word cloud
    function draw(words) {
        var cloud = svg.selectAll("g text")
                        .data(words, function(d) { return d.text; })

        //Entering words
        cloud.enter()
            .append("text")
            .style("font-family", "Impact")
            .style("fill", function(d, i) { return fill(i); })
            .attr("text-anchor", "middle")
            .attr('font-size', 0.5)
            .text(function(d) { return d.text; });

        //Entering and existing words
        cloud
            .transition()
                .duration(100)
                .style("font-size", function(d) { return d.size/1.3 + "px"; })
                .attr("transform", function(d) {
                    return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                })
                .style("fill-opacity", 1);

        //Exiting words
        cloud.exit()
            .transition()
                .duration(10)
                .style('fill-opacity', 1e-6)
                .attr('font-size', 1)
                .remove();
    }


    //Use the module pattern to encapsulate the visualisation code. We'll
    // expose only the parts that need to be public.
    return {

        //Recompute the word cloud for a new set of words. This method will
        // asycnhronously call draw when the layout has been computed.
        //The outside world will need to call this function, so make it part
        // of the wordCloud return value.
        update: function(words) {
            d3.layout.cloud().size([500, 600])
                .words(words)
                .padding(5)
                .rotate(function() { return ~~(Math.random() * 2) * 90; })
                .font("Impact")
                .fontSize(function(d) { return d.size; })
                .on("end", draw)
                .start();
        }
    }

}

//Some sample data - http://en.wikiquote.org/wiki/Opening_lines
var words_sports = [
    "Jets Open record Born: Height: meters Plays: World ranking: Grand Slam titles: party French Winnipeg fans last Age: Righthanded Win-loss 2017: best reached two 2017 year 0 - Saturday ice hockey Las Golden Knights back season Cup — made put top match world Madrid week. Roland win beat Vegas good",
    "New U.S. Olympic game team all-around – Patriots start last Rio Martha gold Martha’s Tom Brady Bills back next “I even take found women’s gymnastics gymnasts individual Valeri USA Gymnastics tells PEOPLE Patterson Brady, England England’s Patriots’ season. Brissett week, defense team’s first Buffalo’s week Gronkowski several it’s play",
    "NFL passes – Franchitti play quarterbacks packaged screen one next takes quarterback completion per average receivers able made yards much easier passing pass racing 2013 IndyCar three season, first 2000 years five Bill league percentage Football percent least interference way plays college without offenses Dario driver damage multiple career. highest",
    "said lap last second two first going third race Johnson Chelsea Sunday’s record ahead qualifying “I car good really left Busch back don’t Bahrain champion pole three made think there. five — Newman Jones PGA players “The still “It’s final put felt know started points tire lead No. run keep"
]

var words_enter = [
    "Prime available Video Amazon now countries will 200 launched service around earlier year, price / subscription big shows show 'Amazon’s countries', 'Amazon officially video-on-demand territories world. retailer suggested launch official, introductory $2.99 €2.99 month numerous markets. rate good half rises $5.99 €5.99 month. bundled available, there’s free seven-day trial want",
    "Stan book Lee, comic Lee Marvel honored - culture Black characters movie writer artists created never going That’s said: us will world 'Superhero creator Hollywood', 'LOS ANGELES (Reuters) Comic giant dreamed pop icons Spider-Man, Iron Man, Hulk, Panther countless others, Hollywood hundreds fans celebrities. died November age 95, saw ink-on-paper",
    "I was able to fetch some of these for the word clouds Can try more tomorrow if needed. was facing some random ass errors, for like 1.5 hours ",
    " will Log Twin Seinabo Lady Coulson\\'s art Catherine documentary knew CES Kickstarter people working still party. music us Morgan new Green first Lynch\\'s one find best Peaks scenes really Sey show she’s kind I’d think Body body painting Black Light technique process dipped says, answer Cooper\\'s director campaign raise David"
]

var words_tech = [
    "game games new service will Google said video streaming industry people — Google’s data sci-fi many stream Stadia help science virtual-reality makers Oculus, including connection creative said. technology Game introduced play offer gaming. called work internet later titles trying users subscription access library model game. take titles, Microsoft trial year",
    "said blockchain technology securities company will start-up SETL financial project ownership using technology, still Australian SETL’s going make Culligan former meat $75 (Reuters) - Impossible secured million firm Ventures companies growing primarily New David Editing transfer first record new one easier, it’s chief regulatory JP Morgan chairman 'Silicon Valley imitation",
    "new Nike fitness products - version Nike+ running made app, sportswear app users access launched including soccer Inc U.S. want 'Nike personal', 'NEW YORK (Reuters) Nike, world’s biggest firm, launching offers preferential hottest sneakers, raising game competition heats tracking business. announcement glitzy event New York series self-lacing shoes, transparent air-filled",
    " Italian TV Nigerian statement Fiber will Sky Back Girls former minister next month\\\'s elections, form Congress Party race viable alternative become mission candidates allow incumbent Nigeria\\\'s corruption group kidnapped unit internet deal Sky’s broadband offer customers content Italia Zappia fiber network"
]

var words_poli = [
    "Trump U.S. border said. Mexico President will two energy Service -- — military Congress Secret new security House first Russian State told statement gas last former New three political want see including official Earth power American one people president White Donald Senate Comey ' along projects Mexican take know",
    "U.S. will border people House Mexico asylum build wall miles Australia leaders see border, McCarthy last country told Basque said. state police including Democrats I think president funding immigration White third city legal fiscal pension near Biarritz protesters Protesters show United parts",
    "will tax say back much new going billion first immigration think Americans Senate law come Russian budget Biden reform among White U.S. long million thought Leumi bonds laws taxes one security way House take campaign didn\\'t front me. Biden\\'s years Donald including ' major changes Congress",
    "Trump Ross White will McCain House President said. former Biden first — -- one two Department ' know North think question Congress court evidence Donald Justice decision told values Clinton costume citizenship program US request even investigation Comey Senate Sen. John Arizona Democrats Republican Halloween “I Maryland case DACA"
]


//Prepare one of the sample sentences by removing punctuation,
// creating an array of words and computing a random size attribute.
function getWords(i) {
    return words_sports[i]
            .replace(/[!\.,:;\?]/g, '')
            .split(' ')
            .map(function(d) {
                return {text: d, size: 10 + Math.random() * 60};
            })
}

//This method tells the word cloud to redraw with a new set of words.
//In reality the new words would probably come from a server request,
// user input or some other source.
function showNewWords(vis, i) {
    i = i || 0;
    
    vis.update(getWords(i ++ % 4))
    setTimeout(function() { showNewWords(vis, i + 1)}, 4000)
}

//2

function getWords_enter(i) {
    return words_enter[i]
            .replace(/[!\.,:;\?]/g, '')
            .split(' ')
            .map(function(d) {
                return {text: d, size: 10 + Math.random() * 60};
            })
}

//This method tells the word cloud to redraw with a new set of words.
//In reality the new words would probably come from a server request,
// user input or some other source.
function showNewWords2(vis, i) {
    i = i || 0;
    
    vis.update(getWords_enter(i ++ % 4))
    setTimeout(function() { showNewWords2(vis, i + 1)}, 4000)
}

//3

function getWords_tech(i) {
    return words_tech[i]
            .replace(/[!\.,:;\?]/g, '')
            .split(' ')
            .map(function(d) {
                return {text: d, size: 10 + Math.random() * 60};
            })
}

//This method tells the word cloud to redraw with a new set of words.
//In reality the new words would probably come from a server request,
// user input or some other source.
function showNewWords3(vis, i) {
    i = i || 0;
    
    vis.update(getWords_tech(i ++ % 4))
    setTimeout(function() { showNewWords3(vis, i + 1)}, 4000)
}

//4

function getWords_poli(i) {
    return words_poli[i]
            .replace(/[!\.,:;\?]/g, '')
            .split(' ')
            .map(function(d) {
                return {text: d, size: 10 + Math.random() * 60};
            })
}

//This method tells the word cloud to redraw with a new set of words.
//In reality the new words would probably come from a server request,
// user input or some other source.
function showNewWords4(vis, i) {
    i = i || 0;
    
    vis.update(getWords_poli(i ++ % 4))
    setTimeout(function() { showNewWords4(vis, i + 1)}, 4000)
}

//Create a new instance of the word cloud visualisation.
var myWordCloud = wordCloud("#myAreaChart2");
var wordcloud1 = wordCloud("#myAreaChart3");
var wordcloud2 = wordCloud("#myAreaChart4");
var wordcloud3 = wordCloud("#myAreaChart5");

//Start cycling through the demo data
showNewWords(myWordCloud);
showNewWords2(wordcloud1);
showNewWords3(wordcloud2);
showNewWords4(wordcloud3);