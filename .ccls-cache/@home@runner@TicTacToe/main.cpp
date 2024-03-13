#include <iostream>
#include <vector>

void draw_board() {
    unsigned rows = 3, cols = 3;
    
    for(unsigned i = 0; i < rows; i++) {
        std::cout << " ";
        for(unsigned j = 0; j < cols; j++) {
            std::cout << "a";

            if(j != cols-1) {
                std::cout << " | ";
            }
        }
        if(i != rows-1) {
            std::cout << std::endl;
            for(unsigned k = 0; k < 3*cols+cols-1; k++) {
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