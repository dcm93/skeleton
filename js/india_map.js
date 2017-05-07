$(document).ready(function () {

    var w = 600;
    var h = 600;
    var proj = d3.geo.mercator();
    var path = d3.geo.path().projection(proj);
    var t = proj.translate();
    var s = proj.scale() 
    $color = d3.scaleOrdinal()
        .domain(["no", "yes", "progress"])
        .range([d3.rgb("#32CD32"), d3.rgb("red"), d3.rgb("#FFFF66")]);

    var map = d3.select("#india-map").append("svg:svg")
        .attr("width", w)
        .attr("height", h)
        .style("background", "#eee")
        .call(initialize);

    var india = map.append("svg:g")
        .attr("id", "india")
        .style("background-color", "#eee")
        ;
    map.append('rect').attr('width', w).attr('height', h).style('stroke', 'black').style('fill', 'none');

    d3.json("data/states.json", function (json) {
        india.selectAll("path")
            .data(json.features)
            .enter()
            .append("path")
            .attr("d", path)
            .attr("fill", function (d) {
                console.log($color(d.policy));
                return $color(d.policy);
            }).style('opacity', 1)
            .attr("value", function (d) {
                return d.id;
            })
            .on("mouseover", function (event) {
                d3.select(this).style("fill", function (d) {
                    return $color(d.policy);
                }).style('opacity', 0.30)
                    .append('svg:title').text(function (d) {
                        return d.id
                    })
                    ;
            })
            .on("mouseout", function (event) {
                d3.select(this).style("fill", function (d) {
                    return $color(d.policy);
                }).style('opacity', 1);
            })
            .on('click', function (d) {
                console.log('open tab')
                var legend = d3.select('#board').append('text').text(d.id).attr('translate', "transform(25, 50)");
            });
    });

    function initialize() {
        proj.scale(6700);
        proj.translate([-1240, 720]);
    }
});