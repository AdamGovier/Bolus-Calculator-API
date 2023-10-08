<template>
    <nav>
        <v-app-bar flat app class="px-4" height="90" color="primary white--text">
            <img class="mr-1" :src="require('@/assets/icons/logo.png')" height="50" />
            <v-spacer/>
            <v-toolbar-title>
                <span class="mr-4 text-uppercase">Moderation Tool</span>
            </v-toolbar-title>
            <v-app-bar-nav-icon large class="white--text" @click="drawer = !drawer"></v-app-bar-nav-icon>
        </v-app-bar>

        <v-navigation-drawer app color="secondary" v-model="drawer">
            <v-list class="pt-4 pl-2">
                <v-list-item>
                    <v-list-item-content class="mt-4">
                        <h1 class="white--text text-uppercase font-weight-medium">Tools</h1>
                    </v-list-item-content>
                </v-list-item>
                <NavLink icon="view-dashboard" title="Overview" route="/" :isFirst="true"/>
                <NavLink icon="food" title="Hotshot Manager" route="/Hotshots" />
                <NavLink icon="face-agent" title="Tickets" route="/Tickets" />
                <NavLink icon="account-multiple" title="Users" route="/Users" />
            </v-list>
            <template v-slot:append>
                <div class="pa-2 pb-3">
                    <v-btn block plain class="mr-4 white--text hidden-sm-and-down">
                        <span>Sign Out</span>
                        <v-icon right>mdi-exit-to-app</v-icon>
                    </v-btn>
                </div>
            </template>
        </v-navigation-drawer>
    </nav>
</template>

<script>
import NavLink from "@/components/Navbar/components/NavLink.vue";

export default {
    components: {
        NavLink
    },
    data() {
        return {
            drawer: false
        }
    }
}
</script>