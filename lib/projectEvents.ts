export const OPEN_PROJECT_EVENT =
    "portfolio:open-project";

export type OpenProjectEventDetail = {
    projectName: string;
};

export function openProject(
    projectName: string
) {
    window.dispatchEvent(
        new CustomEvent<OpenProjectEventDetail>(
            OPEN_PROJECT_EVENT,
            {
                detail: {
                    projectName,
                },
            }
        )
    );
}