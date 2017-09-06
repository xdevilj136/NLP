<template>
<div class="right-content">
{{path}}
<p>{{test}}</p>
</div>
</template>
<script>
import {mapState} from 'vuex';
export default {
	name: 'test',
    data () {
        return {
            path: this.location
        }
    },
    watch: {
        $route () {
            this.path = this.location
        }
    },
    computed: mapState(['test']),
    created(){
    }
}
</script>