import { getActiveAttributionOptions } from "../actions/attribution";
import AttributionPopup from "./AttributionPopup";

export default async function AttributionPopupWrapper() {
    const options = await getActiveAttributionOptions();

    if (!options || options.length === 0) {
        return null;
    }

    return <AttributionPopup options={options} />;
}
