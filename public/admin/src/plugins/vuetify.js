import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: "#313131",
                secondary: "#2a2a2a",
                accent: '#ef4d5a',
                error: '#d9534f',
                success: '#5cb85c',
                danger: '#d9534f'
            }
        }
    }
});
