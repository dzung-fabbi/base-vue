import Vue from "vue";

export const toast = (
  message,
  title = null,
  variant = "secondary",
  toaster = "b-toaster-top-center",
  autoHideDelay = 2000
) => {
  const vm = new Vue({});
  return vm.$bvToast.toast(message, {
    title,
    noCloseButton: false,
    autoHideDelay,
    appendToast: true,
    toaster,
    variant,
    noFade: false,
    solid: true
  });
};

export const urlify = (text, linkTitle) => {
  let urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(urlRegex, function(url) {
    return (
      '<a target="_blank" class="a-box" href="' +
      url +
      '">' +
      linkTitle +
      "</a>"
    );
  });
};

export const urlText = text => {
  let urlRegex = /(https?:\/\/[^\s]+)/g;
  text = text.trim();
  text = text.replace(urlRegex, function(url) {
    return (
      '<a target="_blank" class="a-link" href="' + url + '">' + url + "</a>"
    );
  });

  return text.replace(/(?:\r\n|\r|\n)/g, "<br>");
};
