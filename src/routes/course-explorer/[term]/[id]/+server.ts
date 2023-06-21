import api from "$lib/api.js";
import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ params }) => {
    return new Response(JSON.stringify(await api(`/classschedules/${params.term}/${params.id}`)));
};
