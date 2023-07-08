const box_width = 80;
const row_height = 20;
const arrow_height = 15;
const model_width = 40;
const stroke_width = 1.5;

function promptBox(container, x, y, items, class_name) {
    if (class_name === undefined) {
        class_name = 'prompt';
    }
    const box = container.append("g")
        .attr("transform", `translate(${x}, ${y})`);
    
    const height = row_height * items.length;
    const offset = (box_width - model_width) / 2;
    const rect = box.append("rect")
        .classed(class_name, true)
        .attr("width", box_width)
        .attr("height", height)
        .attr("rx", 4)
        .attr("stroke-width", stroke_width);
    for (let i = 0; i < items.length; i++) {
        if (i > 0) {
            box.append("line")
            .classed(class_name, true)
                .attr("x1", 0)
                .attr("y1", row_height * i)
                .attr("x2", box_width)
                .attr("y2", row_height * i)
                .attr("stroke-width", stroke_width);
        }
        if (items[i] === "examples" || items[i] === "tools") {
            box.append("rect")
            .classed(items[i], true)
                .attr("width", box_width - 8)
                .attr("height", row_height - 8)
                .attr("rx", 4)
                .attr("x", 4)
                .attr("y", (row_height * i) + 4);
        } else if (items[i] === "action") {
            box.append("rect")
            .classed("action", true)
                .attr("width", model_width - 8)
                .attr("height", row_height - 8)
                .attr("rx", 4)
                .attr("x", 4 + offset)
                .attr("y", (row_height * i) + 4);
        }
    }
    return y + height;
}

function modelBox(container, x, y) {
    const box = container.append("g")
        .attr("transform", `translate(${x}, ${y})`);

    const offset = (box_width - model_width) / 2;
    
    const rect = box.append("rect")
        .classed("model", true)
        .attr("width", model_width)
        .attr("height", row_height)
        .attr("x", offset)
        .attr("rx", 8)
        .attr("stroke-width", stroke_width);
    return y + row_height + 1;
}

function down_arrow(container, x, y, class_name) {
    if (class_name === undefined) {
        class_name = 'arrow';
    }
    const arrow = container.append("g")
        .attr("transform", `translate(${x}, ${y})`);
    const center = box_width / 2;
    arrow.append("line")
        .classed(class_name, true)
        .attr("x1", center)
        .attr("y1", 0)
        .attr("x2", center)
        .attr("y2", arrow_height)
        .attr("stroke-width", stroke_width);
    arrow.append("line")
        .classed(class_name, true)
        .attr("x1", center)
        .attr("y1", arrow_height)
        .attr("x2", center - 5)
        .attr("y2", arrow_height - 5)
        .attr("stroke-width", stroke_width);
    arrow.append("line")
        .classed(class_name, true)
        .attr("x1", center)
        .attr("y1", arrow_height)
        .attr("x2", center + 5)
        .attr("y2", arrow_height - 5)
        .attr("stroke-width", stroke_width);
    return y + arrow_height + 2;
}

function backlink(container, x, startY, endY, offset) {
    const link = container.append("g")
        .attr("transform", `translate(${x}, ${startY})`);
    var path = `M ${box_width}  0`;
    path += ` L ${box_width + offset - 8} 0`;
    path += ` A 8 8 0 0 0 ${box_width + offset} -8`;
    path += ` L ${box_width + offset} ${endY - startY + 8}`;
    path += ` A 8 8 0 0 0 ${box_width + offset - 8} ${endY - startY}`;
    path += ` L ${box_width} ${endY - startY}`;
    link.append("path")
        .classed("arrow", true)
        .attr("d", path)
        .attr("stroke-width", stroke_width)
        .attr("fill", "none");
    link.append("line")
        .classed("arrow", true)
        .attr("x1", box_width)
        .attr("y1", endY - startY)
        .attr("x2", box_width + 5)
        .attr("y2", endY - startY - 5)
        .attr("stroke-width", stroke_width);
    link.append("line")
        .classed("arrow", true)
        .attr("x1", box_width)
        .attr("y1", endY - startY)
        .attr("x2", box_width + 5)
        .attr("y2", endY - startY + 5)
        .attr("stroke-width", stroke_width);
}

function diagram(container, data) {
    // Declare the chart dimensions and margins.
    const width = 110;
    const height = 200;
    const marginTop = 4;
    const marginRight = 4;
    const marginBottom = 4;
    const marginLeft = 4;

    // Create the SVG container.
    const svg = d3.create("svg")
        .attr("width", width)
        .attr("height", height);

    // Append the SVG element.
    container.append(svg.node());

    const g = svg.append("g");

    var ys = [];
    var heights = [];
    var numBacklinks = 0;

    let currentX = marginRight;
    let currentY = marginTop;

    for (var i=0; i<data.length; i++) {
        var d = data[i];
        if (d.type == 'prompt') {
            ys.push(currentY);
            currentY = promptBox(g, currentX, currentY, d.items);
            heights.push(currentY - ys[ys.length - 1]);
        } else if (d.type == 'model') {
            ys.push(currentY);
            currentY = modelBox(g, currentX, currentY);
            heights.push(currentY - ys[ys.length - 1]);
        } else if (d.type == 'tool') {
            ys.push(currentY);
            currentY = promptBox(g, currentX, currentY, ['prompt'], 'tool');
            heights.push(currentY - ys[ys.length - 1]);
        }
        if ('backlink' in d) {
            const startY = ys[ys.length - 1] + (heights[heights.length - 1] / 2);
            const backlinkY = ys[d.backlink] + (heights[d.backlink] / 2);
            backlink(g, currentX, startY, backlinkY, (numBacklinks + 1) * 16);
            numBacklinks++;
        }
        if (i < data.length - 1) {
            if (d.type == 'prompt' && data[i+1].type == 'tool') {
                currentY = down_arrow(g, currentX, currentY - 4, 'tool');
            } else {
                currentY = down_arrow(g, currentX, currentY);
            }
        }
    }

    const scale = Math.min(1.0, (height -20) / currentY);
    g.attr("transform", `scale(${scale}, ${scale})`);
}