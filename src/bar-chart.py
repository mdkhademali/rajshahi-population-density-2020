import matplotlib.pyplot as plt

# Data
districts = ['Rajshahi', 'Naogaon', 'Natore', 'Chapai Nawabganj', 'Pabna', 'Sirajganj']
population_density = [1150, 920, 1030, 870, 1280, 1410]

# Assign a unique color for each district
colors = ['#ffeda0', '#feb24c', '#f03b20', '#bd0026', '#c51b8a', '#6a3d9a']

# Bar Chart
plt.figure(figsize=(10,6))
bars = plt.bar(districts, population_density, color=colors)

# Add title and labels
plt.title('Population Density of Rajshahi Division Districts (2020)', fontsize=14, fontweight='bold')
plt.xlabel('District', fontsize=12)
plt.ylabel('Population Density (people/km²)', fontsize=12)

# Add value labels on top of bars
for bar in bars:
    yval = bar.get_height()
    plt.text(bar.get_x() + bar.get_width()/2, yval + 20, int(yval), ha='center', va='bottom', fontsize=10)

# Style
plt.grid(axis='y', linestyle='--', alpha=0.7)

# Add source and author as footnote
plt.figtext(0.1, -0.05, 'Source: GPWv4 (CIESIN, 2020) | Author: Md. Khadem Ali', fontsize=10, ha='left', color='gray')

plt.tight_layout()
plt.show()