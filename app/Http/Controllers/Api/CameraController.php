public function store(Request $request)
{
    // Validate input
    $request->validate([
        'animal' => 'required|string',
        'confidence' => 'required|numeric',
        'image' => 'required|image'
    ]);

    // Store image
    $path = $request->file('image')->store('detections', 'public');

    // Save detection
    $detection = Detection::create([
        'animal' => strtolower($request->animal),
        'confidence' => $request->confidence,
        'image_path' => $path,
    ]);

    // Email triggers for these animals
    $alertAnimals = ['tiger', 'elephant', 'orang utan'];

    if (in_array($detection->animal, $alertAnimals)) {
        Mail::to("amarsazx@gmail.com")->send(new AnimalDetectedAlert($detection));
    }

    return response()->json(['success' => true]);
}
