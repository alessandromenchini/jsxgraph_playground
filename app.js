new Vue({
  el: "#app",
  vuetify: new Vuetify(),
  data() {
    return {
      min: 0,
      max: 100,
      ampiezza: 3,
      frequenza: 1,
      fase: 0,
      time_multiplier: 1,
      freqarm_count: 0,
      range: [-20, 70],
    };
  },
  methods: {
    init() {
      //inizializzazione della app
      var self = this;
      
      var board = JXG.JSXGraph.initBoard("area_grafico", {
        boundingbox: [-5*Math.PI, 5, 5*Math.PI, -5],
        axis: true,
      });

      board.create("functiongraph", [
        function (x) {
          let result = self.ampiezza * Math.sin( self.frequenza * x - self.fase) ;
          // for (let index = 2; index < self.freqarm_count; index++) {
          //   result +=  self.ampiezza * Math.sin( self.frequenza * (2*index+1) * x - self.fase)            
          // }
          result +=  (self.ampiezza/3) * Math.sin( self.frequenza * 3 * x - self.fase) ;
          result +=  (self.ampiezza/5) * Math.sin( self.frequenza * 5 * x - self.fase) ;
          result +=  (self.ampiezza/7) * Math.sin( self.frequenza * 7 * x - self.fase) ;
          result +=  (self.ampiezza/9) * Math.sin( self.frequenza * 9 * x - self.fase) ;
          result +=  (self.ampiezza/11) * Math.sin( self.frequenza * 11 * x - self.fase) ;
          return result;
        },
        -Math.PI*5,
        5 * Math.PI,
      ]);

      window.setInterval(function(){
        var dd = new Date();
        self.fase= dd.getTime()/self.time_multiplier;
        board.update();
      },100);

      window.myBoard = board;
    },
  },
  mounted() {
    this.init();
  },
  watch: {
      ampiezza: function(val) {
        myBoard.update();
      },
      frequenza: function(val) {
        myBoard.update();
      },
      fase: function(val) {
        myBoard.update();
      },
      freqarm_count: function(val) {
        myBoard.update();
      }

  }
});
