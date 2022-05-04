export const useUsers = () => {
    return useAsyncData("users", () => $fetch("/api/users"))
} 