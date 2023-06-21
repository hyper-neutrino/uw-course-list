<script lang="ts">
    export let data: any;
    const cache = new Map<string, any[]>();
</script>

<div id="box">
    <div id="container">
        <input type="number" value={parseInt(data.term.slice(0, -1)) + 1900} />
        <select value={data.term.slice(-1)}>
            <option value="1">Winter</option>
            <option value="5">Spring</option>
            <option value="9">Fall</option>
        </select>
    </div>
</div>

<style lang="scss">
    #box {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        background: linear-gradient(120deg, #111, #333, #222);
    }

    #container {
        padding: 5vh 5vw;
        border: 5px solid #eeccee;
        border-radius: 20px;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    input[type="number"] {
        -moz-appearance: textfield;
        appearance: textfield;
    }

    input,
    select {
        color: white;
        font-size: 150%;
        padding: 0.25em;
        background-color: #fff2;
        border: none;
        outline: none;
    }
</style>
