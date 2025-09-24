function DeepMergedObject(...objects) {
    const deepCopy = objects.map(object => JSON.parse(JSON.stringify(object)));
    return deepCopy.reduce((merged, current) => ({ ...merged, ...current }), {});
}

export default DeepMergedObject;
