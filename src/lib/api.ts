import { API_KEY } from "$env/static/private";

export default async function (route: string) {
    const request = await fetch(`https://openapi.data.uwaterloo.ca/v3${route}`, { headers: { "x-api-key": API_KEY } });
    return await request.json();
}
