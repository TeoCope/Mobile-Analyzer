const Utils = {
    colors: {
      red: "#FF0000",
      blue: "#0000FF",
      green: "#00FF00",
    },

    listItem: (key = "",text) => {
      return $("<li>").html("<b>" + key + ":</b> " + text);
    }
  };