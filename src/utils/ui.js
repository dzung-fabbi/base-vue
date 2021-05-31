import Vue from 'vue';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

export const toast = (
  message,
  title = null,
  type = "success",
  position = "top-right",
  duration = 5000
) => {
  Vue.use(VueToast);
  return Vue.$toast.open({
    message,
    title,
    duration,
    position,
    type: type === 'danger' ? 'error' : type,
    queue: true,
    dismissible: true
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
