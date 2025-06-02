import sympy
import random

# Construct a polynomial with the secret as the constant term
def construct_polynomial(secret_value, degree):
    coefficients = [random.randint(1, 999) for _ in range(degree)]
    coefficients.append(secret_value)  # Constant term (secret) at the end
    x = sympy.symbols('x')
    return sympy.Poly(coefficients[::-1], x)  # Reverse to match degree order

# Generate a single share (x, f(x))
def generate_share(poly, x_val):
    return (x_val, poly.eval(x_val))

# Perform Lagrange interpolation to reconstruct the original polynomial
def interpolate_lagrange(share_points):
    x = sympy.symbols('x')
    reconstructed = 0

    for i, (xi, yi) in enumerate(share_points):
        term = 1
        for j, (xj, _) in enumerate(share_points):
            if i != j:
                term *= (x - xj) / (xi - xj)
        reconstructed += yi * term

    return sympy.simplify(reconstructed)

# Prompt user and generate shares
def share_secret():
    print("\n=== Secret Sharing: Splitting Phase ===")
    secret = int(input("Enter a secret integer: "))
    threshold = int(input("Minimum number of shares needed to recover it: "))
    total = int(input("Total number of shares to distribute: "))

    poly = construct_polynomial(secret, threshold - 1)
    shares = [generate_share(poly, i) for i in range(1, total + 1)]

    print(f"\nGenerated Polynomial: f(x) = {poly.as_expr()}")
    print("Shares:")
    for x, y in shares:
        print(f"Share {x}: ({x}, {y})")

    return shares

# Prompt user and recover the secret
def reconstruct_secret():
    print("\n=== Secret Sharing: Recovery Phase ===")
    count = int(input("How many shares do you have? "))
    points = []

    for _ in range(count):
        raw = input("Enter share (x,y): ")
        x_str, y_str = raw.strip().split(',')
        points.append((int(x_str), int(y_str)))

    poly = interpolate_lagrange(points)
    secret = poly.subs(sympy.symbols('x'), 0)

    print(f"\nReconstructed Polynomial: f(x) = {poly}")
    print(f"Recovered Secret: {int(secret)}")
    return int(secret)

# Main menu
def main():
    while True:
        print("\n--- Shamir’s Secret Sharing ---")
        print("1. Share a secret")
        print("2. Rebuild a secret")
        print("3. Quit")

        option = input("Select an option (1/2/3): ").strip()
        if option == '1':
            share_secret()
        elif option == '2':
            reconstruct_secret()
        elif option == '3':
            print("Goodbye!")
            break
        else:
            print("Invalid input. Please try again.")

if __name__ == "__main__":
    main()
