import api from "$lib/api";
import type { ServerLoad } from "@sveltejs/kit";

export const load: ServerLoad = async ({ fetch }) => {
    const { termCode: term } = await api("/terms/current");
    return { term };
};
