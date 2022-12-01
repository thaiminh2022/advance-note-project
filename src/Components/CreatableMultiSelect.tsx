import { MultiSelect, MultiSelectProps, SelectItem } from "@mantine/core";
import React, { useState } from "react";

function CreatableMultiSelect(props: MultiSelectProps) {

    return (
        <MultiSelect
            {...props}
            searchable
            creatable
            getCreateLabel={(query) => `+ Create ${query}`}
        />
    );
}


export default CreatableMultiSelect;