import { PinInput, PinInputField } from '@chakra-ui/react';
import type { ActionFunctionArgs, MetaFunction } from '@remix-run/node';
import React from 'react';

export const meta: MetaFunction = () => {
    return [{ title: 'Re-Wordle' }, { name: 'description', content: 'Welcome to Remix!' }];
};

export async function loader() {
    return {
        attempts: [[], [], [], [], [], []]
    };
}

export async function action({ request }: ActionFunctionArgs) {
    const formData = Object.fromEntries(await request.formData());

    console.log({ formData });
    return {
        attempts: [[], [], [], [], [], []]
    };
}

const colorMap = {
    0: 'black',
    1: 'green',
    2: 'yellow'
};

export default function Index() {
    return (
        <div className="font-sans p-4">
            {Array.from({ length: 6 }, (_, i) => (
                <React.Fragment key={i}>
                    <PinInput type="alphanumeric">
                        {Array.from({ length: 5 }, (_, j) => (
                            <PinInputField key={j} />
                        ))}
                    </PinInput>
                    <br />
                </React.Fragment>
            ))}
        </div>
    );
}
