#include <iostream>
#include <vector>

void draw_board() {
    size_t rows = 3, cols = 3;
    
    for(size_t i = 0; i < rows; i++) {
        std::cout << " ";
        for(size_t j = 0; j < cols; j++) {
            std::cout << "a";

            if(j != cols-1) {
                std::cout << " | ";
            }
        }
        if(i != rows-1) {
            std::cout << std::endl;
            for(size_t k = 0; k < 3*cols+cols-1; k++) {
                std::cout << "-";
            }
        }
        std::cout << std::endl;
    }
}

void print_vector(std::vector<int> vect) {
    for(auto el: vect) {
        std::cout << el;
    }
}

int main() {
    std::vector<int> (0, 9);
    
    draw_board();
}