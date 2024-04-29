<template>
    <div>
        <button v-if="userRole === 'agent'">Create Property</button>
        <button v-if="userRole === 'agent'">Remove Property</button>
        <button v-if="userRole === 'agent'">Manage Properties</button>

        <button v-if="userRole === 'buyer'">View Properties</button>
        <button v-if="userRole === 'buyer'">Search Properties</button>
        <button v-if="userRole === 'buyer'">Save Properties</button>

        <button v-if="userRole === 'admin'">Create Property</button>
        <button v-if="userRole === 'admin'">Remove Property</button>
        <button v-if="userRole === 'admin'">Manage Properties</button>
        <button v-if="userRole === 'admin'">View Properties</button>
        <button v-if="userRole === 'admin'">Search Properties</button>
        <button v-if="userRole === 'admin'">Save Properties</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            userRole: sessionStorage.getItem("role") // Replace with the actual user role property
        };
    }
};
</script>