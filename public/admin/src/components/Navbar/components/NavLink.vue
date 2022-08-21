<template>
    <v-list-item router :to="route" class="ml-2 mt-2" :class="{'mt-0': isFirst}">
        <v-list-item-action class="mr-4">
            <v-icon size="30" class="white--text">mdi-{{ icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
            <v-list-item-title class="white--text">{{ title }}</v-list-item-title>
        </v-list-item-content>
    </v-list-item>
</template>

<script>
export default {
    props: ['icon', 'title', 'route', 'isFirst']
}
</script>