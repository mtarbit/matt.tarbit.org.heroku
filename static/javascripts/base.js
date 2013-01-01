$(function(){
    bg.init();
});

var bg = {};

bg.init = function(){
    this.$canvas = $('<canvas>');
    this.$content = $('.content');

    this.canvas = this.$canvas.get(0);

    $('body').prepend(this.$canvas);

    this.$canvas.css({ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 });

    if (this.canvas.getContext) {
        this.ctx = this.canvas.getContext('2d');

        var self = this;

        $(window).on('resize', function(){
            self.stretchCanvas();
            self.paintCanvas();
        }).resize();

    } else {
        this.$canvas.remove();
    }
};

bg.contentCoords = function(){
    var contentOff = this.$content.offset();
    var contentDim = {
        'width': this.$content.outerWidth(),
        'height': this.$content.outerHeight()
    };

    var x1 = contentOff.left;
    var x2 = contentDim.width + x1;
    var y1 = contentOff.top;
    var y2 = contentDim.height + y1;

    return { x1: x1, x2: x2, y1: y1, y2: y2 };
};

bg.stretchCanvas = function(){
    this.w = this.$canvas.width();
    this.h = this.$canvas.height();
    this.$canvas.attr({ width: this.w, height: this.h });
};

bg.paintCanvas = function(){
    var fh = 10;

    this.ctx.clearRect(0, 0, this.w, this.h);

    this.ctx.font = fh + "px 'Courier'";
    this.ctx.textBaseline = 'top';
    this.ctx.fillStyle = '#888';

    var fw = this.ctx.measureText('\u2571').width;

    var rows = Math.ceil(this.h / fh);
    var cols = Math.ceil(this.w / fw);
    var coords = this.contentCoords();

    for (var r = 0; r < rows; r++) {
        for (var c = 0; c < cols; c++) {
            var x = c * fw;
            var y = r * fh;

            if (x > coords.x1 && x < coords.x2 && y > coords.y1 && y < coords.y2) continue;

            if (Math.random() < (r / rows)) {
                var s = String.fromCharCode(33 + Math.round(Math.random() * 93));
            } else {
                var s = (Math.random() > 0.5) ? '\u2571' : '\u2572';
            }

            this.ctx.fillText(s, x, y);
        }
    }
};
