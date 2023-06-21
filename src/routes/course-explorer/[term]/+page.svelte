<script lang="ts" context="module">
    const consent: { [key: string]: string } = { N: "No", I: "Instructor", D: "Department" };
</script>

<script lang="ts">
    export let data: {
        term: string;
        courses: any[];
        subjects: { [key: string]: string };
        orgs: { [key: string]: string };
    };

    const cache = new Map<string, any>();
    let courses: any[] = [];

    let career: "UG" | "GRD" = "UG";
    let subject: string = data.courses[0].subject;
    let code: string = "";
    let noconsent: boolean = false;

    async function get(id: string) {
        if (cache.has(id)) return cache.get(id);
        const value = await (await fetch(`/course-explorer/${data.term}/${id}`)).json();
        cache.set(id, value);
        return value;
    }
</script>

<div class="container">
    <a href="/course-explorer">Back to Term Selection</a>
    <br />

    <ul>
        {#each courses as x}
            <li>
                <div class="row">
                    <button on:click={() => (courses = courses.filter((k) => k !== x))}>-</button>
                    <b><code>{x.subject} {x.code}</code>: {x.name}</b>
                </div>
                <ul>
                    {#await get(x.id)}
                        <li>Loading schedule data...</li>
                    {:then s}
                        {#each s as k}
                            <li>
                                <u>{k.enrolledStudents}/{k.maxEnrollmentCapacity}</u>
                                <b>{k.courseComponent} {k.classSection.toString().padStart(3, "0")}</b>
                                {k.instructorData
                                    ? `(${k.instructorData
                                          .map((i) => `${i.instructorFirstName} ${i.instructorLastName}`)
                                          .join(", ")})`
                                    : ""}
                                {k.scheduleData
                                    ? `: ${k.scheduleData
                                          .map(
                                              (s) =>
                                                  `${[0, 1, 2, 3, 4, 5, 6]
                                                      .filter((i) => s.classMeetingWeekPatternCode[i] === "Y")
                                                      .map((i) => ["Su", "M", "Tu", "W", "Th", "F", "Sa"][i])
                                                      .join("")} ${s.classMeetingStartTime.slice(
                                                      11,
                                                      -3,
                                                  )} - ${s.classMeetingEndTime.slice(11, -3)} (${s.locationName})`,
                                          )
                                          .join(", ")}`
                                    : ""}
                            </li>
                        {/each}
                    {/await}
                </ul>
            </li>
        {/each}
    </ul>

    <br />

    <div class="row">
        <select bind:value={career}>
            <option value="UG">Undergraduate</option>
            <option value="GRD">Graduate</option>
        </select>
        <select bind:value={subject}>
            <option value="ALL">ALL</option>
            {#each Object.keys(data.subjects) as x}
                <option value={x}>{x}</option>
            {/each}
        </select>
        <span>{subject === "ALL" ? "Showing all subjects" : data.subjects[subject]}</span>
        <span />
        <input type="text" bind:value={code} placeholder="Course Code (x for wildcard)" />
        <label>
            <input type="checkbox" bind:checked={noconsent} />
            Hide courses that require consent to enroll/drop
        </label>
    </div>

    <br />

    <table>
        {#each data.courses as x}
            <tr
                style={x.career === career &&
                (subject === "ALL" || x.subject === subject) &&
                x.code.match(new RegExp(code.replaceAll("x", "."), "i")) &&
                (!noconsent || (x.enrollConsent === "N" && x.dropConsent === "N"))
                    ? ""
                    : "display: none"}
            >
                <td>
                    <div class="row">
                        <button on:click={() => (courses = [...courses, x])} disabled={courses.includes(x)}>+</button>
                        <b><code>{x.subject} {x.code}</code>: {x.name}</b>
                    </div>
                    <br /><br />
                    {#if x.enrollConsent !== "N" || x.dropConsent !== "N"}
                        {#if x.enrollConsent !== "N"}
                            {consent[x.enrollConsent]} consent required to enroll.
                        {/if}
                        {#if x.dropConsent !== "N"}
                            {consent[x.dropConsent]} consent required to drop.
                        {/if}
                        <br /><br />
                    {/if}
                    {x.description}
                    <br /><br />
                    Organization: {data.orgs[x.org]} <br />
                    Group: {data.orgs[x.group]} <br />
                    {x.reqs ?? ""}
                </td>
            </tr>
        {/each}
    </table>
</div>

<style lang="scss">
    table,
    tr,
    td {
        border: 1px solid #aaa;
        border-collapse: collapse;
    }

    td {
        padding: 5px;
    }
</style>
