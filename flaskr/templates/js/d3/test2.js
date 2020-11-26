function area2(){
var width = document.getElementById('myAreaChart3').clientWidth;
var height = width / 2.5;

var svg = d3.select("#myAreaChart3").append("svg");

function resize() {
    width = document.getElementById('myAreaChart3').clientWidth;
    console.log(width);
    height = width / 2.5;
    d3.select('#myAreaChart3 svg')
      .attr('width', width)
      .attr('height', height);

      var padding = {t: 5, r: 20, b: 5, l: 20};
      
     var trellisWidth = width - padding.l - padding.r;
     var trellisHeight = height / 3 - padding.t - padding.b;
      
      
      svg.selectAll('.background')
          .data(['A', 'B', 'C']) // dummy data
          .enter()
          .append('rect') // Append 4 rectangles
          .attr('class', 'background')
          .attr('width', trellisWidth) // Use our trellis dimensions
          .attr('height', trellisHeight)
          .attr('transform', function(d, i) {
              // Position based on the matrix array indices.
              // i = 1 for column 1, row 0)
              //var tx = i * (trellisWidth + padding.l + padding.r) + padding.l;
              var tx = padding.l;
              var ty = i * (trellisHeight + padding.t + padding.b) + padding.t;
              return 'translate('+[tx,ty]+')';   
          });
}

window.onresize = resize;

}
