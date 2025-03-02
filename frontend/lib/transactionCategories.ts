const categoryRules: Record<string, string[]> = {
  Food: ["restaurant", "cafe", "grocery", "zomato", "swiggy", "food"],
  Transportation: ["uber", "ola", "taxi", "metro", "bus", "fuel", "parking"],
  Shopping: ["amazon", "flipkart", "mall", "store", "shop"],
  Entertainment: ["movie", "theatre", "concert", "netflix", "spotify"],
  Utilities: ["electricity", "water", "gas", "internet", "phone"],
  Healthcare: ["hospital", "doctor", "pharmacy", "medicine"],
  Education: ["school", "college", "course", "book"],
  Travel: ["hotel", "flight", "train", "vacation"],
}

export function categorizeTransaction(description: string): string {
  const lowerDescription = description.toLowerCase()

  for (const [category, keywords] of Object.entries(categoryRules)) {
    if (keywords.some((keyword) => lowerDescription.includes(keyword))) {
      return category
    }
  }

  return "Miscellaneous"
}

