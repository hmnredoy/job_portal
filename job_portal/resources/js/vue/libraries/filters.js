import Vue from "vue";
import moment from "moment";

Vue.filter('str_limit', (value, size) => {
    if (!value) return '';
    value = value.toString();

    if (value.length <= size) {
        return value;
    }
    return value.substr(0, size) + '...';
});

Vue.filter('status', (value) => {
    return value ? 'Active' : 'Inactive';
});

Vue.filter('fromNow', (date) => {
    return moment(date).startOf('hour').fromNow();
});

Vue.filter('dateFormat', (date) => {
    return moment(date).format('MMMM Do YYYY, h:mm:ss a');
});
