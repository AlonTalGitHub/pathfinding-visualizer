export default function buildMinHeap(nodes) {
    const size = nodes.length;

    for (let i = Math.floor(size / 2) - 1; i >= 0; i--) {
        minHeapify(nodes, size, i)
    }

    return nodes;
}

export function minHeapify(nodes, size, i) {
    let smallest = i;
    let left = i * 2 + 1;
    let right = left + 1;

    if (right < size && nodes[right].distance < nodes[smallest].distance) {
        smallest = right
    }

    if (left < size && nodes[left].distance < nodes[smallest].distance) {
        smallest = left;
    }

    if (smallest !== i) {
        const temp = nodes[i];
        nodes[i] = nodes[smallest];
        nodes[smallest] = temp;
        minHeapify(nodes, size, smallest);
    }
    return nodes

}

