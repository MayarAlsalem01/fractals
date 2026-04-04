import { cookies } from "next/headers";
import { getActiveAttributionOptions } from "../actions/attribution";
import AttributionPopup from "./AttributionPopup";

export default async function AttributionPopupWrapper() {
    const cookieStore = await cookies();
    const isHidden = cookieStore.get("hide_attribution_survey");

    if (isHidden) {
        return null;
    }

    const options = await getActiveAttributionOptions();

    if (!options || options.length === 0) {
        return null;
    }

    return <AttributionPopup options={options} />;
}
