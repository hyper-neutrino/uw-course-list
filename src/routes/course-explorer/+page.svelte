<script lang="ts">
    export let data: any;
    const cache = new Map<string, any[]>();

    let year: number = parseInt(data.term.slice(0, -1)) + 1900;
    let season: "1" | "5" | "9" = data.term.slice(-1);
</script>

<div id="box">
    <div id="container">
        <div>
            <input type="number" bind:value={year} />
            <select bind:value={season}>
                <option value="1">Winter</option>
                <option value="5">Spring</option>
                <option value="9">Fall</option>
            </select>
        </div>
        <div>
            <a href="/course-explorer/{year - 1900}{season}">Go!</a>
        </div>
    </div>
</div>

<style lang="scss">
    #box {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }

    #container {
        padding: 5vh 5vw;
        border: 5px solid #ff0077;
        border-radius: 20px;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    input[type="number"] {
        -moz-appearance: textfield;
        appearance: textfield;
        width: calc(max(10vw, 100px));
    }

    input,
    select {
        font-size: 100%;
        padding: 0.25em;
        background-color: #0002;
        border: none;
        outline: none;
    }

    a {
        color: #222;
        font-weight: bold;
    }
</style>
